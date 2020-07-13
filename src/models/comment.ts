import { Listing } from "./api";

export interface Comment {
  replies?: Listing<Comment>;
  total_awards_received: number;
  approved_at_utc: null;
  ups: number;
  awarders: any[];
  mod_reason_by: null;
  banned_by: null;
  author_flair_type: string;
  removal_reason: null;
  link_id: string;
  author_flair_template_id: null;
  likes: null;
  user_reports: any[];
  saved: boolean;
  id: string;
  banned_at_utc: null;
  mod_reason_title: null;
  gilded: number;
  archived: boolean;
  no_follow: boolean;
  author: string;
  can_mod_post: boolean;
  send_replies: boolean;
  parent_id: string;
  score: number;
  author_fullname: string;
  report_reasons: null;
  approved_by: null;
  all_awardings: any[];
  subreddit_id: string;
  body: string;
  edited: boolean;
  downs: number;
  author_flair_css_class: null;
  is_submitter: boolean;
  collapsed: boolean;
  author_flair_richtext: any[];
  author_patreon_flair: boolean;
  body_html: string;
  gildings: Gildings;
  collapsed_reason: null;
  associated_award: null;
  stickied: boolean;
  author_premium: boolean;
  subreddit_type: string;
  can_gild: boolean;
  top_awarded_type: null;
  author_flair_text_color: null;
  score_hidden: boolean;
  permalink: string;
  num_reports: null;
  locked: boolean;
  name: string;
  created: number;
  subreddit: string;
  author_flair_text: null;
  treatment_tags: any[];
  created_utc: number;
  subreddit_name_prefixed: string;
  controversiality: number;
  depth: number;
  author_flair_background_color: null;
  collapsed_because_crowd_control: null;
  mod_reports: any[];
  mod_note: null;
  distinguished: null;
}

export interface Gildings {}