export type QuizSession = {
    id: number;
    quizz_id: number;
    user_id: number;
    start_time: Date;
    end_time: null;
    duration: null;
    total_correct: number;
    created_at: Date;
    updated_at: Date;
    answers: any[];
};

export type QuizSessionResponse = {
    session: QuizSession | null;
};

export type QuizDetail = {
    id: number;
    research_id: number;
    title: string;
    description: string;
    max_user_join: number;
    price_join: number;
    type_reward: string;
    start_date: Date;
    created_at: Date;
    updated_at: Date;
    questions: QuizQuestion[];
};

export type QuizQuestion = {
    id: number;
    question: string;
    answers: string[];
};

export type QuizDetailResponse = {
    quizz: QuizDetail;
};
