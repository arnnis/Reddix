export interface Subreddit {
  user_flair_background_color: null;
  submit_text_html: null | string;
  restrict_posting: boolean;
  user_is_banned: boolean;
  free_form_reports: boolean;
  wiki_enabled: boolean | null;
  user_is_muted: boolean;
  user_can_flair_in_sr: null;
  display_name: string;
  header_img: null | string;
  title: string;
  allow_galleries: boolean;
  icon_size: number[] | null;
  primary_color: string;
  active_user_count: null;
  icon_img: string;
  display_name_prefixed: string;
  accounts_active: null;
  public_traffic: boolean;
  subscribers: number;
  user_flair_richtext: any[];
  name: string;
  quarantine: boolean;
  hide_ads: boolean;
  emojis_enabled: boolean;
  advertiser_category: string;
  public_description: string;
  comment_score_hide_mins: number;
  user_has_favorited: boolean;
  user_flair_template_id: null;
  community_icon: string;
  banner_background_image: string;
  original_content_tag_enabled: boolean;
  submit_text: string;
  description_html: string;
  spoilers_enabled: boolean;
  header_title: null | string;
  header_size: number[] | null;
  user_flair_position: FlairPosition;
  all_original_content: boolean;
  has_menu_widget: boolean;
  is_enrolled_in_new_modmail: null;
  key_color: string;
  can_assign_user_flair: boolean;
  created: number;
  wls: number;
  show_media_preview: boolean;
  submission_type: SubmissionType;
  user_is_subscriber: boolean;
  disable_contributor_requests: boolean;
  allow_videogifs: boolean;
  user_flair_type: UserFlairType;
  allow_polls: boolean;
  collapse_deleted_comments: boolean;
  emojis_custom_size: null;
  public_description_html: null | string;
  allow_videos: boolean;
  is_crosspostable_subreddit: boolean | null;
  notification_level: NotificationLevel;
  can_assign_link_flair: boolean;
  accounts_active_is_fuzzed: boolean;
  submit_text_label: null | string;
  link_flair_position: FlairPosition | null;
  user_sr_flair_enabled: null;
  user_flair_enabled_in_sr: boolean;
  allow_discovery: boolean;
  user_sr_theme_enabled: boolean;
  link_flair_enabled: boolean;
  subreddit_type: SubredditType;
  suggested_comment_sort: null;
  banner_img: string;
  user_flair_text: null;
  banner_background_color: string;
  show_media: boolean;
  id: string;
  user_is_moderator: boolean;
  over18: boolean;
  description: string;
  submit_link_label: null | string;
  user_flair_text_color: null;
  restrict_commenting: boolean;
  user_flair_css_class: null;
  allow_images: boolean;
  lang: Lang;
  whitelist_status: WhitelistStatus;
  url: string;
  created_utc: number;
  banner_size: number[] | null;
  mobile_banner_image: string;
  user_is_contributor: boolean;
  videostream_links_count?: number;
  content_category?: string;
  allow_chat_post_creation?: boolean;
  is_chat_post_feature_enabled?: boolean;
}

export enum Lang {
  En = "en",
  Es = "es",
}

export enum FlairPosition {
  Empty = "",
  Left = "left",
  Right = "right",
}

export enum NotificationLevel {
  Low = "low",
}

export enum SubmissionType {
  Any = "any",
  Link = "link",
  Self = "self",
}

export enum SubredditType {
  Public = "public",
}

export enum UserFlairType {
  Text = "text",
}

export enum WhitelistStatus {
  AllAds = "all_ads",
}

export enum Kind {
  T5 = "t5",
}
