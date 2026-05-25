import type { Schema, Struct } from '@strapi/strapi';

export interface AboutQnhSectionHomePageAboutFeaturePoint
  extends Struct.ComponentSchema {
  collectionName: 'components_about_qnh_section_home_page_about_feature_points';
  info: {
    displayName: 'about-feature-point';
  };
  attributes: {
    text: Schema.Attribute.String;
  };
}

export interface AboutQnhSectionHomePageAboutHighlight
  extends Struct.ComponentSchema {
  collectionName: 'components_about_qnh_section_home_page_about_highlights';
  info: {
    displayName: 'about-highlight';
  };
  attributes: {
    desc: Schema.Attribute.Text;
    iconKey: Schema.Attribute.Enumeration<
      ['heartPulse', 'shieldCheck', 'award']
    >;
    title: Schema.Attribute.String;
  };
}

export interface DepartmentSectionsCta extends Struct.ComponentSchema {
  collectionName: 'components_department_sections_ctas';
  info: {
    displayName: 'cta';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface DepartmentSectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_department_sections_heroes';
  info: {
    displayName: 'hero';
    icon: 'archive';
  };
  attributes: {
    description: Schema.Attribute.Text;
    emergencySupport: Schema.Attribute.String;
    schedule: Schema.Attribute.String;
    tag: Schema.Attribute.String;
  };
}

export interface DepartmentSectionsHighlights extends Struct.ComponentSchema {
  collectionName: 'components_department_sections_highlights';
  info: {
    displayName: 'highlights';
  };
  attributes: {
    items: Schema.Attribute.Component<'department-sections.paragraph', true>;
    sectionLabel: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface DepartmentSectionsItems extends Struct.ComponentSchema {
  collectionName: 'components_department_sections_items';
  info: {
    displayName: 'items';
  };
  attributes: {
    item: Schema.Attribute.Text;
  };
}

export interface DepartmentSectionsOverview extends Struct.ComponentSchema {
  collectionName: 'components_department_sections_overviews';
  info: {
    displayName: 'overview';
  };
  attributes: {
    paragraphs: Schema.Attribute.Component<
      'department-sections.paragraph',
      true
    >;
    sectionLabel: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface DepartmentSectionsParagraph extends Struct.ComponentSchema {
  collectionName: 'components_department_sections_paragraphs';
  info: {
    displayName: 'paragraphs';
  };
  attributes: {
    paragraph: Schema.Attribute.Text;
  };
}

export interface DepartmentSectionsSharedSimpleFeature
  extends Struct.ComponentSchema {
  collectionName: 'components_department_sections_shared_simple_features';
  info: {
    displayName: 'shared.simple-feature';
  };
  attributes: {
    desc: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface DepartmentSectionsTreatedCases extends Struct.ComponentSchema {
  collectionName: 'components_department_sections_treated_cases';
  info: {
    displayName: 'content.section-list';
  };
  attributes: {
    description: Schema.Attribute.Text;
    items: Schema.Attribute.Component<'department-sections.items', true>;
    sectionLabel: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface DepartmentSectionsWhatsAppNumber
  extends Struct.ComponentSchema {
  collectionName: 'components_department_sections_whats_app_numbers';
  info: {
    displayName: 'whatsAppNumber';
  };
  pluginOptions: {
    i18n: {
      localized: false;
    };
  };
  attributes: {};
}

export interface DoctorsSharedSimpleListItem extends Struct.ComponentSchema {
  collectionName: 'components_doctors_shared_simple_list_item_s';
  info: {
    displayName: 'shared.simple-list-item,';
  };
  attributes: {
    title: Schema.Attribute.String;
  };
}

export interface NewsAchievementsContentBase extends Struct.ComponentSchema {
  collectionName: 'components_news_achievements_content_bases';
  info: {
    displayName: 'content-base';
  };
  attributes: {
    coverImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    description: Schema.Attribute.Text;
    publishedDate: Schema.Attribute.Date;
    title: Schema.Attribute.String;
  };
}

export interface PrivacyPolicyPoints extends Struct.ComponentSchema {
  collectionName: 'components_privacy_policy_points_s';
  info: {
    displayName: 'points ';
  };
  attributes: {
    text: Schema.Attribute.Text;
  };
}

export interface PrivacyPolicyPrivacySection extends Struct.ComponentSchema {
  collectionName: 'components_privacy_policy_privacy_sections';
  info: {
    displayName: 'privacy-section';
  };
  attributes: {
    iconKey: Schema.Attribute.Enumeration<
      [
        'heartPulse',
        'stethoscope',
        'hospital',
        'ambulance',
        'activity',
        'syringe',
        'pill',
        'heart',
        'cross',
        'shieldPlus',
        'microscope',
        'scanHeart',
        'clipboardPlus',
        'bone',
        'brain',
        'eyeMedical',
        'ear',
        'thermometer',
        'flask',
        'bed',
        'badgePlus',
        'shieldCheck',
        'shield',
        'shieldAlert',
        'lock',
        'lockKeyhole',
        'fingerprint',
        'key',
        'userRoundCheck',
        'building2',
        'building',
        'briefcase',
        'fileText',
        'folder',
        'database',
        'server',
        'globe',
        'network',
        'cpu',
        'hardDrive',
        'cloud',
        'users',
        'user',
        'userCheck',
        'userPlus',
        'userCog',
        'contact',
        'mail',
        'phone',
        'smartphone',
        'messageCircle',
        'messagesSquare',
        'bell',
        'calendar',
        'calendarDays',
        'clock',
        'timerReset',
        'check',
        'checkCircle2',
        'badgeCheck',
        'star',
        'sparkles',
        'trophy',
        'medal',
        'award',
        'thumbsUp',
        'chevronDown',
        'chevronRight',
        'arrowRight',
        'arrowLeft',
        'refresh',
        'search',
        'filter',
        'settings',
        'sliders',
        'activitySquare',
        'lineChart',
        'barChart',
        'pieChart',
        'trendingUp',
        'trendingDown',
        'bookOpen',
        'graduationCap',
        'newspaper',
        'fileBadge',
        'clipboardList',
        'alertTriangle',
        'siren',
        'triangleAlert',
        'car',
        'plane',
        'hotel',
        'coffee',
        'utensils',
        'wifi',
        'mapPin',
        'image',
        'camera',
        'playCircle',
        'video',
        'headphones',
        'languages',
      ]
    >;
    order: Schema.Attribute.Integer;
    points: Schema.Attribute.Component<'privacy-policy.points', true>;
    title: Schema.Attribute.String;
  };
}

export interface QnhHistoryPageHistorySections extends Struct.ComponentSchema {
  collectionName: 'components_qnh_history_page_history_sections';
  info: {
    displayName: 'historySections';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    year: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface WebsiteLinksContactInfo extends Struct.ComponentSchema {
  collectionName: 'components_website_links_contact_infos';
  info: {
    displayName: 'Contact Info';
  };
  attributes: {
    CallCenterPhone: Schema.Attribute.String;
    email: Schema.Attribute.Email;
    phone: Schema.Attribute.String;
  };
}

export interface WebsiteLinksMobileAppLinks extends Struct.ComponentSchema {
  collectionName: 'components_website_links_mobile_app_links';
  info: {
    displayName: 'Mobile App Links';
  };
  attributes: {
    mobileAppAndroid: Schema.Attribute.String;
    mobileAppIos: Schema.Attribute.String;
  };
}

export interface WebsiteLinksSocialMediaLinks extends Struct.ComponentSchema {
  collectionName: 'components_website_links_social_media_links';
  info: {
    displayName: 'Social Media Links';
  };
  attributes: {
    facebook: Schema.Attribute.String;
    instagram: Schema.Attribute.String;
    twitter: Schema.Attribute.String;
    youtube: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'about-qnh-section-home-page.about-feature-point': AboutQnhSectionHomePageAboutFeaturePoint;
      'about-qnh-section-home-page.about-highlight': AboutQnhSectionHomePageAboutHighlight;
      'department-sections.cta': DepartmentSectionsCta;
      'department-sections.hero': DepartmentSectionsHero;
      'department-sections.highlights': DepartmentSectionsHighlights;
      'department-sections.items': DepartmentSectionsItems;
      'department-sections.overview': DepartmentSectionsOverview;
      'department-sections.paragraph': DepartmentSectionsParagraph;
      'department-sections.shared-simple-feature': DepartmentSectionsSharedSimpleFeature;
      'department-sections.treated-cases': DepartmentSectionsTreatedCases;
      'department-sections.whats-app-number': DepartmentSectionsWhatsAppNumber;
      'doctors.shared-simple-list-item': DoctorsSharedSimpleListItem;
      'news-achievements.content-base': NewsAchievementsContentBase;
      'privacy-policy.points': PrivacyPolicyPoints;
      'privacy-policy.privacy-section': PrivacyPolicyPrivacySection;
      'qnh-history-page.history-sections': QnhHistoryPageHistorySections;
      'website-links.contact-info': WebsiteLinksContactInfo;
      'website-links.mobile-app-links': WebsiteLinksMobileAppLinks;
      'website-links.social-media-links': WebsiteLinksSocialMediaLinks;
    }
  }
}
