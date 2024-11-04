""" from typing import Dict, Union
from dataclasses import dataclass


@dataclass
class EngagementMetrics:
    engagement_rate: float
    interaction_quality: float
    growth_rate: float


@dataclass
class ContentQuality:
    frequency: float
    originality: float
    diversity: float


@dataclass
class Trustworthiness:
    trust_score: float
    verified_followers: float
    reputation_index: float


@dataclass
class SocialImpact:
    network_influence: float
    trend_setting: float
    mentions_reposts: float


@dataclass
class MonetizationPotential:
    token_transactions: float
    crowdfunding: float
    endorsement_success: float


@dataclass
class GovernanceParticipation:
    voting_activity: float
    proposal_contribution: float


class SocialScoreCalculator:
    def __init__(self):
        self.weights = {
            "engagement": 0.3,
            "content": 0.2,
            "trust": 0.2,
            "impact": 0.15,
            "monetization": 0.1,
            "governance": 0.05,
        }

    def calculate_engagement_score(self, metrics: EngagementMetrics) -> float:
        return (
            0.4 * metrics.engagement_rate
            + 0.3 * metrics.interaction_quality
            + 0.3 * metrics.growth_rate
        )

    def calculate_content_score(self, quality: ContentQuality) -> float:
        return (
            0.3 * quality.frequency
            + 0.4 * quality.originality
            + 0.3 * quality.diversity
        )

    def calculate_trust_score(self, trust: Trustworthiness) -> float:
        return (
            0.5 * trust.trust_score
            + 0.3 * trust.verified_followers
            + 0.2 * trust.reputation_index
        )

    def calculate_impact_score(self, impact: SocialImpact) -> float:
        return (
            0.5 * impact.network_influence
            + 0.3 * impact.trend_setting
            + 0.2 * impact.mentions_reposts
        )

    def calculate_monetization_score(
        self, monetization: MonetizationPotential
    ) -> float:
        return (
            0.5 * monetization.token_transactions
            + 0.3 * monetization.crowdfunding
            + 0.2 * monetization.endorsement_success
        )

    def calculate_governance_score(self, governance: GovernanceParticipation) -> float:
        return 0.7 * governance.voting_activity + 0.3 * governance.proposal_contribution

    def calculate_social_score(
        self,
        engagement: EngagementMetrics,
        content: ContentQuality,
        trust: Trustworthiness,
        impact: SocialImpact,
        monetization: MonetizationPotential,
        governance: GovernanceParticipation,
    ) -> Dict[str, Union[float, str]]:

        e = self.calculate_engagement_score(engagement)
        c = self.calculate_content_score(content)
        t = self.calculate_trust_score(trust)
        i = self.calculate_impact_score(impact)
        m = self.calculate_monetization_score(monetization)
        g = self.calculate_governance_score(governance)

        social_score = (
            self.weights["engagement"] * e
            + self.weights["content"] * c
            + self.weights["trust"] * t
            + self.weights["impact"] * i
            + self.weights["monetization"] * m
            + self.weights["governance"] * g
        )

        tier = self.get_tier(social_score)

        return {
            "social_score": round(social_score, 2),
            "tier": tier,
            "engagement_score": round(e, 2),
            "content_score": round(c, 2),
            "trust_score": round(t, 2),
            "impact_score": round(i, 2),
            "monetization_score": round(m, 2),
            "governance_score": round(g, 2),
        }

    @staticmethod
    def get_tier(score: float) -> str:
        if score >= 80:
            return "Top-tier influencer"
        elif 60 <= score < 80:
            return "Mid-tier influencer"
        elif 40 <= score < 60:
            return "Emerging influencer"
        else:
            return "Needs improvement"
 """
