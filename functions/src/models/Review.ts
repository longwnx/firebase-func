export interface ReviewProduct {
  id: number;
  date_created: string;
  date_created_gmt: string;
  product_id: number;
  status: string;
  reviewer: string;
  reviewer_email: string;
  review: string;
  rating: number;
  verified: boolean;
  reviewer_avatar_urls: {
    "24": string;
    "48": string;
    "96": string;
  };
  _links: {
    self: [
      {
        href: string;
      },
    ];
    collection: [
      {
        href: string;
      },
    ];
    up: [
      {
        href: string;
      },
    ];
  };
}
