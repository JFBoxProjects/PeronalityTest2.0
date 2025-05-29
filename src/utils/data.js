export const questions = [
    { id: 1, prompt: "I am:", options: { yellow: "Encourager", blue: "Deep thinker", red: "Doer", green: "Listener" } },
    { id: 2, prompt: "I learn by:", options: { yellow: "Experimenting", blue: "Reading/Study", red: "Diving in", green: "Observing" } },
    { id: 3, prompt: "My decisions are made by:", options: { yellow: "Intuition", blue: "Logic", red: "Experience", green: "Feelings" } },
    { id: 4, prompt: "When I see a problem:", options: { yellow: "Brainstorm", blue: "Analyze", red: "Fix it", green: "Mediate" } },
    { id: 5, prompt: "I prefer to:", options: { yellow: "Create options", blue: "Think deeply", red: "Take action", green: "Support others" } },
    { id: 6, prompt: "In groups, I tend to be:", options: { yellow: "Expressive", blue: "Quiet", red: "Directive", green: "Accepting" } },
    { id: 7, prompt: "I value:", options: { yellow: "Recognition", blue: "Understanding", red: "Results", green: "Harmony" } },
    { id: 8, prompt: "I communicate through:", options: { yellow: "Stories", blue: "Facts", red: "Directives", green: "Sharing" } },
    { id: 9, prompt: "Under stress, I become:", options: { yellow: "Scattered", blue: "Withdrawn", red: "Controlling", green: "Worried" } },
    { id: 10, prompt: "I enjoy:", options: { yellow: "Possibilities", blue: "Knowledge", red: "Challenges", green: "Relationships" } }
];

export const personalityTypes = {
    yellow: {
        type: "Promoter",
        explanation: `<strong>Promoter (Yellow)</strong>: As a Promoter, you thrive in dynamic, social environments. You're naturally optimistic, creative, and excellent at inspiring others. Your greatest strengths include:
            <ul>
                <li>Natural enthusiasm and charisma</li>
                <li>Ability to motivate and encourage others</li>
                <li>Creative problem-solving skills</li>
                <li>Adaptability and spontaneity</li>
            </ul>`
    },
    blue: {
        type: "Planner",
        explanation: `<strong>Planner (Blue)</strong>: As a Planner, you excel in analytical thinking and strategic planning. You're naturally thoughtful, detail-oriented, and value precision. Your greatest strengths include:
            <ul>
                <li>Strong analytical abilities</li>
                <li>Careful attention to detail</li>
                <li>Strategic thinking skills</li>
                <li>Deep knowledge and expertise</li>
            </ul>`
    },
    red: {
        type: "Producer",
        explanation: `<strong>Producer (Red)</strong>: As a Producer, you excel in taking action and achieving results. You're naturally decisive, focused, and goal-oriented. Your greatest strengths include:
            <ul>
                <li>Strong leadership abilities</li>
                <li>Results-oriented mindset</li>
                <li>Decisive decision-making</li>
                <li>Efficient problem-solving</li>
            </ul>`
    },
    green: {
        type: "Peacekeeper",
        explanation: `<strong>Peacekeeper (Green)</strong>: As a Peacekeeper, you excel in maintaining harmony and supporting others. You're naturally empathetic, patient, and understanding. Your greatest strengths include:
            <ul>
                <li>Strong emotional intelligence</li>
                <li>Excellent listening skills</li>
                <li>Natural mediator abilities</li>
                <li>Supportive and nurturing nature</li>
            </ul>`
    }
};

export const additionalContent = {
    plannerBlue: {
        title: "Planner (Blue) Details",
        content: [
            { label: "Strengths", value: "Analytical thinking, attention to detail, strategic planning, deep knowledge" },
            { label: "Growth Areas", value: "May need to work on being more flexible and expressing emotions" },
            { label: "Communication", value: "Prefers clear, factual, and well-organized information" },
            { label: "Leadership", value: "Leads through expertise and careful planning" }
        ]
    },
    peacekeeperGreen: {
        title: "Peacekeeper (Green) Details",
        content: [
            { label: "Strengths", value: "Empathy, listening skills, mediation, supporting others" },
            { label: "Growth Areas", value: "May need to work on being more assertive and making quick decisions" },
            { label: "Communication", value: "Prefers gentle, harmonious, and inclusive communication" },
            { label: "Leadership", value: "Leads through consensus and team building" }
        ]
    },
    producerRed: {
        title: "Producer (Red) Details",
        content: [
            { label: "Strengths", value: "Decision making, goal achievement, efficiency, leadership" },
            { label: "Growth Areas", value: "May need to work on patience and considering others' feelings" },
            { label: "Communication", value: "Prefers direct, clear, and results-focused communication" },
            { label: "Leadership", value: "Leads through action and clear direction" }
        ]
    },
    promoterYellow: {
        title: "Promoter (Yellow) Details",
        content: [
            { label: "Strengths", value: "Creativity, enthusiasm, adaptability, inspiration" },
            { label: "Growth Areas", value: "May need to work on follow-through and organization" },
            { label: "Communication", value: "Prefers enthusiastic, creative, and engaging communication" },
            { label: "Leadership", value: "Leads through inspiration and motivation" }
        ]
    }
};