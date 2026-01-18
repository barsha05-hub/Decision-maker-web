/**
 * ============================================
 * SMART DECISION HELPER - DECISION ENGINE
 * ============================================
 * Core logic for analyzing decisions:
 * - Category based questions
 * - Auto-generated pros & cons
 * - Scoring algorithm
 * - Decision explanation
 */

class DecisionEngine {
    constructor() {
        this.categories = {
            job: {
                label: "Job Decision",
                icon: "💼",
                questions: [
                    {
                        id: "current_skills",
                        text: "What are your key skills?",
                        type: "text"
                    },
                    {
                        id: "salary_important",
                        text: "How important is salary to you? (1-10)",
                        type: "slider",
                        min: 1,
                        max: 10
                    },
                    {
                        id: "risk_tolerance",
                        text: "How much risk can you handle?",
                        type: "radio",
                        options: ["Very Low", "Low", "Medium", "High"]
                    },
                    {
                        id: "family_support",
                        text: "Will your family support this decision?",
                        type: "radio",
                        options: ["Yes", "No", "Maybe", "Unsure"]
                    },
                    {
                        id: "growth_priority",
                        text: "How important is growth for you? (1-10)",
                        type: "slider",
                        min: 1,
                        max: 10
                    },
                    {
                        id: "work_life_balance",
                        text: "How important is work-life balance?",
                        type: "radio",
                        options: ["Very Important", "Important", "Less Important", "Not Important"]
                    },
                    {
                        id: "long_term_goals",
                        text: "Where do you see yourself in 5 years?",
                        type: "text"
                    }
                ]
            },

            college: {
                label: "College Decision",
                icon: "🎓",
                questions: [
                    {
                        id: "academic_interest",
                        text: "What subject are you most interested in?",
                        type: "text"
                    },
                    {
                        id: "fees_budget",
                        text: "How affordable are the fees? (1-10)",
                        type: "slider",
                        min: 1,
                        max: 10
                    },
                    {
                        id: "college_ranking",
                        text: "How important is college ranking?",
                        type: "radio",
                        options: ["Very Important", "Important", "Less Important", "Not Important"]
                    },
                    {
                        id: "campus_location",
                        text: "Are you willing to move away from home?",
                        type: "radio",
                        options: ["Yes", "No", "Maybe", "Doesn't Matter"]
                    },
                    {
                        id: "placement_record",
                        text: "How important are placement opportunities? (1-10)",
                        type: "slider",
                        min: 1,
                        max: 10
                    },
                    {
                        id: "scholarship_available",
                        text: "Do you need a scholarship?",
                        type: "radio",
                        options: ["Yes", "No", "Maybe", "Unsure"]
                    }
                ]
            },

            career: {
                label: "Career Direction",
                icon: "🚀",
                questions: [
                    {
                        id: "passion_aligned",
                        text: "How well does this career align with your passion? (1-10)",
                        type: "slider",
                        min: 1,
                        max: 10
                    },
                    {
                        id: "income_expectation",
                        text: "How important is income potential? (1-10)",
                        type: "slider",
                        min: 1,
                        max: 10
                    },
                    {
                        id: "market_demand",
                        text: "Is this career in market demand?",
                        type: "radio",
                        options: ["Very High", "High", "Low", "Very Low"]
                    },
                    {
                        id: "required_education",
                        text: "Can you complete the required education?",
                        type: "radio",
                        options: ["Yes", "No", "Maybe", "Not Sure"]
                    },
                    {
                        id: "time_investment",
                        text: "How long until stability? (1-10)",
                        type: "slider",
                        min: 1,
                        max: 10
                    }
                ]
            },

            business: {
                label: "Business Idea",
                icon: "💰",
                questions: [
                    {
                        id: "capital_available",
                        text: "How much capital can you invest? (1-10)",
                        type: "slider",
                        min: 1,
                        max: 10
                    },
                    {
                        id: "market_validation",
                        text: "Have you validated market demand?",
                        type: "radio",
                        options: ["Yes", "No", "Partially", "Not Yet"]
                    },
                    {
                        id: "experience_level",
                        text: "How much experience do you have? (1-10)",
                        type: "slider",
                        min: 1,
                        max: 10
                    },
                    {
                        id: "risk_capacity",
                        text: "Can you handle the risk of failure?",
                        type: "radio",
                        options: ["Yes", "No", "Maybe", "Unsure"]
                    },
                    {
                        id: "competition_level",
                        text: "How intense is the competition?",
                        type: "radio",
                        options: ["Very High", "High", "Medium", "Low"]
                    },
                    {
                        id: "support_system",
                        text: "Do you have a strong support system?",
                        type: "radio",
                        options: ["Yes", "No", "Partial", "Needs Improvement"]
                    }
                ]
            },

            personal: {
                label: "Personal Life Decision",
                icon: "💝",
                questions: [
                    {
                        id: "happiness_factor",
                        text: "How happy will this decision make you? (1-10)",
                        type: "slider",
                        min: 1,
                        max: 10
                    },
                    {
                        id: "long_term_satisfaction",
                        text: "Likelihood of long-term satisfaction? (1-10)",
                        type: "slider",
                        min: 1,
                        max: 10
                    },
                    {
                        id: "relationships_impact",
                        text: "How will this affect relationships?",
                        type: "radio",
                        options: ["Positive", "Neutral", "Negative", "Uncertain"]
                    },
                    {
                        id: "health_impact",
                        text: "Impact on your health?",
                        type: "radio",
                        options: ["Positive", "No Impact", "Negative", "Uncertain"]
                    },
                    {
                        id: "values_alignment",
                        text: "Does it align with your values? (1-10)",
                        type: "slider",
                        min: 1,
                        max: 10
                    }
                ]
            }
        };

        this.proConTemplates = {
            job: {
                pros: [
                    "Stable income and benefits",
                    "Career growth opportunities",
                    "Practical experience",
                    "Job security",
                    "Professional development"
                ],
                cons: [
                    "Work pressure and stress",
                    "Limited personal time",
                    "Routine tasks",
                    "High responsibility",
                    "Limited creativity"
                ]
            },

            college: {
                pros: [
                    "Higher education and skill development",
                    "Networking opportunities",
                    "Better job prospects",
                    "Personal growth",
                    "Exposure to diverse fields"
                ],
                cons: [
                    "High education costs",
                    "Time commitment",
                    "Student debt risk",
                    "No guaranteed job",
                    "High competition"
                ]
            },

            business: {
                pros: [
                    "Independence and ownership",
                    "Unlimited income potential",
                    "Build your own vision",
                    "Flexible schedule",
                    "High personal satisfaction"
                ],
                cons: [
                    "High financial risk",
                    "Unstable income",
                    "Long working hours",
                    "Management challenges",
                    "Risk of failure"
                ]
            },

            career: {
                pros: [
                    "Long-term stability",
                    "Skill and knowledge growth",
                    "Professional recognition",
                    "Financial security",
                    "Social respect"
                ],
                cons: [
                    "High education investment",
                    "Intense competition",
                    "Long preparation period",
                    "Market uncertainty",
                    "Mental stress"
                ]
            }
        };
    }

    getQuestions(category) {
        return this.categories[category]?.questions || [];
    }

    getCategories() {
        return this.categories;
    }

    generateProsCons(situation, category, answers) {
        const base = this.proConTemplates[category] || this.proConTemplates.job;
        let pros = [...base.pros];
        let cons = [...base.cons];

        if (answers.salary_important > 7) {
            pros.push("Attractive salary potential");
        }

        if (answers.risk_tolerance === "High") {
            pros.push("Greater opportunities and challenges");
        } else {
            cons.push("Lower tolerance for uncertainty");
        }

        if (answers.family_support === "No") {
            cons.push("Possible lack of family support");
        }

        return {
            pros: pros.slice(0, 5),
            cons: cons.slice(0, 5)
        };
    }

    calculateScore(situation, category, answers, option, prosCons) {
        let score = 50;

        if (answers.salary_important) {
            score += (answers.salary_important / 10) * 20;
        }

        const riskMap = {
            "Very Low": 5,
            "Low": 35,
            "Medium": 60,
            "High": 90
        };

        if (answers.risk_tolerance) {
            score += (riskMap[answers.risk_tolerance] / 100) * 15;
        }

        const familyMap = {
            "Yes": 15,
            "No": -10,
            "Maybe": 5,
            "Unsure": 2
        };

        if (answers.family_support) {
            score += familyMap[answers.family_support] || 0;
        }

        if (answers.growth_priority) {
            score += (answers.growth_priority / 10) * 20;
        }

        const balanceMap = {
            "Very Important": 15,
            "Important": 10,
            "Less Important": 5,
            "Not Important": 0
        };

        if (answers.work_life_balance) {
            score += balanceMap[answers.work_life_balance] || 0;
        }

        const prosConsScore =
            (prosCons.pros.length / (prosCons.pros.length + prosCons.cons.length)) * 20;

        score += prosConsScore;

        return Math.min(100, Math.max(0, Math.round(score)));
    }

    generateExplanation(winner, scores, situation, category) {
        return `
        <div class="explanation-bullet">
            <strong>Best Option for You: ${winner.name}</strong>
        </div>
        <div class="explanation-bullet">
            <strong>Why this option?</strong>
            <ul>
                <li>Highest score based on your inputs</li>
                <li>Best alignment with your priorities</li>
                <li>Strong long-term potential</li>
                <li>Balanced risk and growth</li>
            </ul>
        </div>
        <div class="explanation-bullet">
            <strong>Things to Keep in Mind:</strong>
            <ul>
                <li>Initial challenges are normal</li>
                <li>Keep learning and improving</li>
                <li>Review progress regularly</li>
            </ul>
        </div>`;
    }

    getTips(option, category) {
        const tips = {
            job: [
                "Improve your skills continuously",
                "Focus on networking",
                "Prove yourself in the first 6 months",
                "Maintain good relationships at work",
                "Learn stress management"
            ],
            college: [
                "Develop strong time management",
                "Participate actively in classes",
                "Join clubs and activities",
                "Look for internships",
                "Build connections with professors"
            ],
            business: [
                "Create a detailed business plan",
                "Conduct market research",
                "Manage finances carefully",
                "Build the right team",
                "Focus on customer satisfaction"
            ]
        };

        return tips[category] || tips.job;
    }
}

// Export for main application
window.DecisionEngine = DecisionEngine;

