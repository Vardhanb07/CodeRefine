from fastapi import APIRouter
from backend.models.analysis_request import AnalysisRequest
from backend.services.static_analyzer import run_static_analysis
from backend.services.groq_service import analyze_with_groq
from backend.services.aggregation_engine import aggregate_issues
from backend.services.confidence_engine import compute_confidence

router = APIRouter()


@router.post("/analyze")
async def analyze(request: AnalysisRequest):
    # 1. Run static analysis
    static_issues = run_static_analysis(request.language, request.code)

    # 2. Get AI analysis from Groq
    groq_result = analyze_with_groq(
        language=request.language,
        mode=request.mode,
        instruction=request.instruction,
        code=request.code,
        static_issues=static_issues,
    )

    # 3. Aggregate static + AI issues
    aggregated = aggregate_issues(static_issues, groq_result["ai_issues"])

    # 4. Compute confidence score
    confidence = compute_confidence(aggregated)

    return {
        "static_issues": static_issues,
        "ai_suggestions": groq_result["ai_issues"],
        "aggregated_issues": aggregated,
        "optimized_code": groq_result["optimized_code"],
        "confidence_score": confidence,
    }
