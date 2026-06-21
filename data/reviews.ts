export interface Review {
  comment: string;
  reviewer_country: string;
  reviewer_country_code: string;
  reviewer_industry: string;
  user_image_url: string;
  username: string;
}

export const featuredReviews: Review[] = [
  {
    comment: "10/10. I have worked with Talha for over a year now and we did around 10 projects with him. I'm always satisfied with the delivery, communication, and response time. I will recommend him for any data scraping or python related projects.",
    reviewer_country: "Netherlands",
    reviewer_country_code: "NL",
    reviewer_industry: "",
    user_image_url: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/0d2acb077bbdaefad78ee51afaf6dee8-1573669966365/9a252124-9cb5-433c-9b4c-a2a8adf6cf30.jpg",
    username: "cecilehuijkman",
  },
  {
    comment: "True pleasure working with Talha. He went above and beyond and helped me with the project to understand the deliverable rather than just delivering an end product. Communication was great too. 5/5 experience. Highly recommend.",
    reviewer_country: "United States",
    reviewer_country_code: "US",
    reviewer_industry: "",
    user_image_url: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/06cfe7c40f5e2da0b136f8cac12f9a07-1759620466757/8e2a9287-9033-407f-8a8e-5f94a8249996.png",
    username: "volumeapps",
  },
  {
    comment: "Talha accepted a gig that 6 other sellers turned down and completed it faster than I expected. He's a great communicator. Fast and expeditious like a ninja in black. Accurate and very easy to work with.",
    reviewer_country: "Slovenia",
    reviewer_country_code: "SI",
    reviewer_industry: "art_and_design",
    user_image_url: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/144fcbe533713b129135871afc03b399-1621883344247/f10f6fa6-882f-4ba3-9f25-ab8f245a2f1f.jpeg",
    username: "power_python",
  },
  {
    comment: "Always does flawless work. Highly recommend a great resource!",
    reviewer_country: "United States",
    reviewer_country_code: "US",
    reviewer_industry: "",
    user_image_url: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/15b96b725ca867c6f653ecf7f1f51d0f-1714662603983/29376205-b207-4aec-b9eb-417ee91221a1.png",
    username: "acuity_capital",
  },
  {
    comment: "Superfast delivery. Thanks for the task!",
    reviewer_country: "United Arab Emirates",
    reviewer_country_code: "AE",
    reviewer_industry: "media_or_entertainment",
    user_image_url: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/039d47d35b5c97137b7a43999a508265-1653218983099/9b81b08f-286c-4cef-bffa-7cf4e1bd30ae.png",
    username: "gmbay_dao",
  },
  {
    comment: "Understood the assignment quickly and was straightforward and prompt.",
    reviewer_country: "United States",
    reviewer_country_code: "US",
    reviewer_industry: "medical_or_pharmaceutical",
    user_image_url: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/09aabbe35af85064d4d15df0cfe789bc-1693274010679/84ef89f4-7474-40bd-9b7b-76815ce040ed.jpeg",
    username: "ragihmurshed",
  },
];

// Display order: (1) reviews with a profile image AND a long/detailed comment,
// (2) reviews with a profile image but a shorter comment, (3) short reviews
// with no image. When `activeCode` is set (e.g. a country hovered on the map),
// that country's reviews float to the top while keeping the same tier order.
const BIG_COMMENT = 150;

function reviewTier(r: Review): number {
  const hasImage = !!r.user_image_url;
  const isBig = r.comment.length >= BIG_COMMENT;
  if (hasImage && isBig) return 0;
  if (hasImage) return 1;
  return 2;
}

export function orderReviews(list: Review[], activeCode?: string | null): Review[] {
  return [...list].sort((a, b) => {
    if (activeCode) {
      const aMatch = a.reviewer_country_code === activeCode ? 0 : 1;
      const bMatch = b.reviewer_country_code === activeCode ? 0 : 1;
      if (aMatch !== bMatch) return aMatch - bMatch;
    }
    const tierDiff = reviewTier(a) - reviewTier(b);
    if (tierDiff !== 0) return tierDiff;
    return b.comment.length - a.comment.length;
  });
}
