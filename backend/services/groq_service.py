import json
import logging
from groq import Groq
from config.settings import GROQ_API_KEY

logger = logging.getLogger(__name__)

_client = None


def _get_client() -> Groq:
    global _client
    if _client is None:
        if GROQ_API_KEY is None:
            logger.warning("GROQ_API_KEY is None! Check your .env file.")
            print("[WARNING] GROQ_API_KEY is None!")
        _client = Groq(api_key=GROQ_API_KEY)
    return _client


def analyze_with_groq(language: str, mode: str, instruction: str, code: str, static_issues: list) -> dict:
    """Send code and static analysis results to Groq LLM for enhanced analysis."""
    static_summary = json.dumps(static_issues, indent=2) if static_issues else "None found."

    prompt = f"""You are an expert code reviewer performing a {mode} analysis of {language} code.

User instruction: {instruction or "Perform a thorough analysis."}

Static analysis tools found these issues:
{static_summary}

Source code to analyze:
```{language}
{code}
```

Please provide a comprehensive analysis. Your response MUST be valid JSON with this exact structure:
{{
  "ai_issues": [
    {{
      "type": "string (issue category)",
      "line": <integer line number or 0 if unknown>,
      "severity": "HIGH | MEDIUM | LOW",
      "message": "brief description of the issue",
      "explanation": "detailed explanation of why this is an issue",
      "suggestion": "specific actionable fix suggestion"
    }}
  ],
  "optimized_code": "the full refactored/optimized version of the code",
  "explanation": "overall summary of the analysis and key improvements made"
}}

Instructions:
1. Explain each static finding listed above (include them in ai_issues with explanation/suggestion).
2. Detect additional issues not caught by static tools.
3. Suggest refactoring improvements.
4. Provide the optimized code in the optimized_code field.
5. Return ONLY valid JSON, no markdown fences, no extra text."""

    try:
        client = _get_client()
        logger.info("Calling Groq API with model llama3-70b-8192...")
        print("[DEBUG] Calling Groq API...")
        response = client.chat.completions.create(
            model="llama3-70b-8192",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.2,
            max_tokens=4096,
        )
        logger.info("Groq API response received successfully.")
        print("[DEBUG] Groq API response received.")
        content = response.choices[0].message.content.strip()
        # Strip markdown fences if present
        if content.startswith("```"):
            content = content.split("```", 2)[1]
            if content.startswith("json"):
                content = content[4:]
            content = content.rsplit("```", 1)[0].strip()

        data = json.loads(content)
        return {
            "ai_issues": data.get("ai_issues", []),
            "optimized_code": data.get("optimized_code", code),
            "explanation": data.get("explanation", ""),
        }
    except json.JSONDecodeError:
        return {"ai_issues": [], "optimized_code": code, "explanation": "Analysis could not be completed. Please try again."}
    except Exception:
        return {"ai_issues": [], "optimized_code": code, "explanation": "An error occurred while contacting the AI service."}
