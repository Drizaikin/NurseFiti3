/**
 * Supabase database types — hand-maintained until `supabase gen types` is run.
 * Covers all tables defined in the migration files.
 */

export type UserRole = 'student' | 'tutor' | 'admin';
export type Cadre = 'KRCHN' | 'BScN' | 'Higher Diploma';
export type ExamCycle = 'May' | 'August' | 'November';
export type PlanTier = 'free' | 'standard' | 'premium';
export type VerificationStatus = 'pending' | 'verified' | 'rejected';
export type VerificationTier = 'standard' | 'gold';
export type QuestionStatus = 'pending_review' | 'approved' | 'rejected' | 'needs_revision';
export type AnswerMode = 'practice' | 'mock_exam' | 'weak_drill';
export type FlashcardRating = 'again' | 'hard' | 'good' | 'easy';
export type SessionStatus = 'pending_approval' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
export type PaymentStatus = 'pending' | 'paid' | 'refunded' | 'failed';
export type GroupPrivacy = 'open' | 'invite_only';
export type NoteStatus = 'pending_review' | 'approved' | 'needs_revision' | 'rejected';
export type PaymentType = 'plan_subscription' | 'revision_plan' | 'session_booking';
export type PayoutStatus = 'pending' | 'processing' | 'success' | 'failed' | 'reversed';
export type SessionPlatform = 'Zoom' | 'Google Meet' | 'WhatsApp';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          role: UserRole;
          full_name: string;
          email: string;
          phone: string;
          avatar_url: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at'>;
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };

      student_profiles: {
        Row: {
          id: string;
          cadre: Cadre;
          specialty: string | null;
          institution: string | null;
          exam_date: string;
          exam_cycle: ExamCycle;
          xp: number;
          level: number;
          streak_count: number;
          last_study_date: string | null;
          plan_tier: PlanTier;
          plan_expires_at: string | null;
        };
        Insert: {
          id: string;
          cadre: Cadre;
          specialty?: string | null;
          institution?: string | null;
          exam_date: string;
          exam_cycle: ExamCycle;
          xp?: number;
          level?: number;
          streak_count?: number;
          last_study_date?: string | null;
          plan_tier?: PlanTier;
          plan_expires_at?: string | null;
        };
        Update: Partial<Database['public']['Tables']['student_profiles']['Row']>;
      };

      tutor_profiles: {
        Row: {
          id: string;
          nck_reg_number: string;
          professional_title: string;
          bio: string | null;
          years_experience: number;
          current_employer: string | null;
          cadres_taught: string[];
          specialties: string[] | null;
          rate_per_hour: number;
          verification_status: VerificationStatus;
          verification_tier: VerificationTier | null;
          whatsapp_number: string | null;
          mpesa_number: string | null;
          total_students: number;
          total_sessions: number;
          average_rating: number;
          pass_rate: number;
          is_accepting_bookings: boolean;
          session_platform: string[];
          allow_instant_booking: boolean;
          allow_group_sessions: boolean;
          buffer_minutes: number;
          nck_certificate_url: string | null;
          academic_qualification_url: string | null;
          national_id_url: string | null;
          rejection_reason: string | null;
        };
        Insert: Omit<Database['public']['Tables']['tutor_profiles']['Row'],
          'total_students' | 'total_sessions' | 'average_rating' | 'pass_rate'>;
        Update: Partial<Database['public']['Tables']['tutor_profiles']['Row']>;
      };

      questions: {
        Row: {
          id: string;
          cadre: string;
          unit: string;
          topic: string;
          stem: string;
          option_a: string;
          option_b: string;
          option_c: string;
          option_d: string;
          correct_option: 'A' | 'B' | 'C' | 'D';
          rationale: string;
          rationale_a: string | null;
          rationale_b: string | null;
          rationale_c: string | null;
          rationale_d: string | null;
          difficulty: 'easy' | 'medium' | 'hard';
          contributor_id: string | null;
          status: QuestionStatus;
          exam_year: number | null;
          paper: string | null;
          views: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['questions']['Row'], 'id' | 'views' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['questions']['Row']>;
      };

      student_answers: {
        Row: {
          id: string;
          student_id: string;
          question_id: string;
          selected_option: string;
          is_correct: boolean;
          time_taken_seconds: number | null;
          mode: AnswerMode;
          session_id: string | null;
          answered_at: string;
        };
        Insert: Omit<Database['public']['Tables']['student_answers']['Row'], 'id' | 'answered_at'>;
        Update: Partial<Database['public']['Tables']['student_answers']['Row']>;
      };

      mock_exam_results: {
        Row: {
          id: string;
          student_id: string;
          cadre: string;
          paper: string;
          total_questions: number;
          correct_answers: number;
          score_percentage: number;
          time_used_minutes: number;
          passed: boolean;
          started_at: string;
          completed_at: string;
        };
        Insert: Omit<Database['public']['Tables']['mock_exam_results']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['mock_exam_results']['Row']>;
      };

      flashcard_decks: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          cadre: string;
          unit: string;
          card_count: number;
          created_by: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['flashcard_decks']['Row'], 'id' | 'card_count' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['flashcard_decks']['Row']>;
      };

      flashcards: {
        Row: {
          id: string;
          deck_id: string;
          front_text: string;
          back_text: string;
          back_highlight: string | null;
          cadre: string;
          unit: string;
          contributor_id: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['flashcards']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['flashcards']['Row']>;
      };

      flashcard_progress: {
        Row: {
          id: string;
          student_id: string;
          card_id: string;
          ease_factor: number;
          interval_days: number;
          repetitions: number;
          rating: FlashcardRating | null;
          next_review_at: string;
          last_reviewed_at: string | null;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['flashcard_progress']['Row'], 'id' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['flashcard_progress']['Row']>;
      };

      tutor_availability: {
        Row: {
          id: string;
          tutor_id: string;
          day_of_week: number;
          start_time: string;
          end_time: string;
          is_active: boolean;
        };
        Insert: Omit<Database['public']['Tables']['tutor_availability']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['tutor_availability']['Row']>;
      };

      sessions: {
        Row: {
          id: string;
          student_id: string;
          tutor_id: string;
          session_date: string;
          start_time: string;
          end_time: string;
          cadre: string;
          topic: string | null;
          platform: SessionPlatform;
          join_link: string | null;
          student_note: string | null;
          tutor_note: string | null;
          duration_minutes: number;
          rate_per_hour: number;
          gross_amount: number;
          platform_fee: number;
          net_amount: number;
          status: SessionStatus;
          payment_status: PaymentStatus;
          payment_reference: string | null;
          booked_at: string;
          completed_at: string | null;
          reviewed: boolean;
        };
        Insert: Omit<Database['public']['Tables']['sessions']['Row'], 'id' | 'booked_at' | 'reviewed'>;
        Update: Partial<Database['public']['Tables']['sessions']['Row']>;
      };

      session_reviews: {
        Row: {
          id: string;
          session_id: string;
          student_id: string;
          tutor_id: string;
          rating: number;
          review_text: string | null;
          keywords: string[] | null;
          is_published: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['session_reviews']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['session_reviews']['Row']>;
      };

      study_groups: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          cadre: string;
          exam_cycle: string;
          privacy: GroupPrivacy;
          creator_id: string;
          member_count: number;
          max_members: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['study_groups']['Row'], 'id' | 'member_count' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['study_groups']['Row']>;
      };

      group_members: {
        Row: {
          group_id: string;
          student_id: string;
          role: 'member' | 'admin';
          joined_at: string;
        };
        Insert: Omit<Database['public']['Tables']['group_members']['Row'], 'joined_at'>;
        Update: Partial<Database['public']['Tables']['group_members']['Row']>;
      };

      revision_plans: {
        Row: {
          id: string;
          student_id: string;
          cadre: string;
          exam_date: string;
          days_available: number;
          study_hours_weekday: number;
          study_hours_weekend: number;
          work_school_status: string;
          plan_html: string;
          plan_data: Record<string, unknown>;
          generated_at: string;
          payment_ref: string | null;
          share_token: string | null;
        };
        Insert: Omit<Database['public']['Tables']['revision_plans']['Row'], 'id' | 'generated_at'>;
        Update: Partial<Database['public']['Tables']['revision_plans']['Row']>;
      };

      student_badges: {
        Row: {
          id: string;
          student_id: string;
          badge_id: string;
          earned_at: string;
        };
        Insert: Omit<Database['public']['Tables']['student_badges']['Row'], 'id' | 'earned_at'>;
        Update: Partial<Database['public']['Tables']['student_badges']['Row']>;
      };

      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          title: string;
          body: string;
          is_read: boolean;
          action_url: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['notifications']['Row'], 'id' | 'is_read' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['notifications']['Row']>;
      };

      payments: {
        Row: {
          id: string;
          user_id: string;
          type: PaymentType;
          amount: number;
          currency: string;
          customer_phone: string;
          // IntaSend fields
          intasend_reference: string | null;
          intasend_checkout_id: string | null;
          intasend_checkout_url: string | null;
          intasend_signature: string | null;
          intasend_invoice_id: string | null;
          intasend_channel: string | null;
          // Legacy Paystack fields (kept for backwards compatibility)
          paystack_reference: string | null;
          paystack_receipt: string | null;
          paystack_access_code: string | null;
          paystack_authorization_url: string | null;
          paystack_channel: string | null;
          status: 'pending' | 'completed' | 'failed' | 'refunded';
          reference_id: string | null;
          initiated_at: string;
          completed_at: string | null;
        };
        Insert: Omit<Database['public']['Tables']['payments']['Row'], 'id' | 'initiated_at'>;
        Update: Partial<Database['public']['Tables']['payments']['Row']>;
      };

      tutor_payouts: {
        Row: {
          id: string;
          tutor_id: string;
          amount: number;
          currency: string;
          tracking_id: string | null;       // IntaSend send-money tracking ID
          recipient_code: string | null;    // Legacy Paystack field
          transfer_code: string | null;     // Legacy Paystack field
          status: PayoutStatus;
          reason: string | null;
          initiated_at: string;
          completed_at: string | null;
        };
        Insert: Omit<Database['public']['Tables']['tutor_payouts']['Row'], 'id' | 'initiated_at'>;
        Update: Partial<Database['public']['Tables']['tutor_payouts']['Row']>;
      };

      study_notes: {
        Row: {
          id: string;
          contributor_id: string;
          cadre: string;
          unit: string;
          title: string;
          content_markdown: string;
          status: NoteStatus;
          views: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['study_notes']['Row'], 'id' | 'views' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['study_notes']['Row']>;
      };

      flagged_questions: {
        Row: {
          id: string;
          student_id: string;
          question_id: string;
          flagged_at: string;
        };
        Insert: Omit<Database['public']['Tables']['flagged_questions']['Row'], 'id' | 'flagged_at'>;
        Update: Partial<Database['public']['Tables']['flagged_questions']['Row']>;
      };

      session_notes: {
        Row: {
          id: string;
          tutor_id: string;
          student_id: string;
          note_text: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['session_notes']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['session_notes']['Row']>;
      };

      units: {
        Row: {
          id: string;
          cadre: string;
          name: string;
          description: string | null;
          nck_weight: number;
          tier: 1 | 2 | 3;
          is_examinable: boolean;
          question_count: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['units']['Row'], 'id' | 'question_count' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['units']['Row']>;
      };

      app_feedback: {
        Row: {
          id: string;
          user_id: string;
          user_role: 'student' | 'tutor';
          display_name: string;
          cadre: string | null;
          category: 'general' | 'complaint' | 'suggestion' | 'bug_report' | 'praise';
          rating: number;
          message: string;
          contact_channel: 'email' | 'whatsapp' | 'none';
          is_approved: boolean;
          is_pinned: boolean;
          helpful_count: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['app_feedback']['Row'], 'id' | 'helpful_count' | 'is_pinned' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['app_feedback']['Row']>;
      };

      feedback_helpful: {
        Row: {
          feedback_id: string;
          user_id: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['feedback_helpful']['Row'], 'created_at'>;
        Update: never;
      };

      practice_sessions: {
        Row: {
          id: string;
          student_id: string;
          cadre: string;
          unit: string | null;
          mode: AnswerMode;
          questions_answered: number;
          correct_answers: number;
          started_at: string;
          completed_at: string | null;
        };
        Insert: Omit<Database['public']['Tables']['practice_sessions']['Row'], 'id' | 'questions_answered' | 'correct_answers' | 'started_at'>;
        Update: Partial<Database['public']['Tables']['practice_sessions']['Row']>;
      };
    };
    Views: Record<string, never>;
    Functions: {
      create_booking_atomic: {
        Args: {
          p_tutor_id: string;
          p_student_id: string;
          p_session_date: string;
          p_start_time: string;
          p_end_time: string;
          p_cadre: string;
          p_topic: string;
          p_platform: string;
          p_duration_minutes: number;
          p_rate_per_hour: number;
        };
        Returns: string;
      };
    };
    Enums: Record<string, never>;
  };
}
