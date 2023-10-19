import {WooCommerceProduct} from "../models/Product";
import {ReviewProduct} from "../models/Review";
import {WoocommerceUser} from "../models/User";

export const convertProduct = (product: WooCommerceProduct) => {
  return {
    id: product?.id || "",
    name: product?.name || "",
    type: product?.type || "",
    sku: product?.sku || "",
    description: product?.description || "",
    weight: product?.weight ?
      {
        value: product?.weight || "",
        unit: "kg",
      } :
      null,
    width: product?.dimensions?.width || null,
    depth: null,
    height:
      product?.dimensions?.height !== "" ? product?.dimensions?.height : null,
    price: product?.price || "",
    categories: product?.categories?.map((cate) => cate?.id) || null,
    brandId: null,
    brandName: "",
    inventoryLevel: null,
    inventoryWarningLevel: null,
    fixedCostShippingPrice: null,
    isFreeShipping: null,
    isVisible: null,
    isFeatured: null,
    upc: null,
    condition: "NEW",
    isConditionShown: true,
    orderQuantityMinimum: null,
    orderQuantityMaximum: null,
    metaDescription: null,
    viewCount: null,
    preorderReleaseDate: null,
    isPreorderOnly: null,
    isPriceHidden: null,
    openGraphType: null,
    reviewsRatingSum: 0,
    reviewsCount: product?.rating_count,
    customFields: [],
    bulkPricingRules: null,
    dateCreated: null,
    dateModified: null,
    images: product?.images?.map((image, index) => ({
      isThumbnail: index === 0,
      productId: product?.id || "",
      urlZoom: image?.src || "",
      urlStandard: image?.src || "",
      urlThumbnail: image?.src || "",
      urlTiny: image?.src || "",
    })),
    videos: null,
    baseVariantId: null,
    inStock: product?.stock_status === "instock",
    hasVariantInventory: false,
    allowAddToCart: false,
    modifierOptions: null,
    optionSetId: null,
    bulkPricing: null,
    bulkPricingCustom: null,
    showStockLabel: false,
    productUrl: product?.permalink || "",
    textContentLabel: null,
    textContentColor: null,
    stockMessage: null,
    showPriceLabel: true,
    stockLevelInfo: null,
    skuTitle: null,
    weightTitle: null,
    shippingCostTitle: null,
    upcTitle: null,
    warranty: null,
    selectedVariantId: 0,
    manufacturePartNumber: null,
    globalTradeproductNumber: null,
    priceHiddenLabel: null,
    customLabels: null,
    currency: null,
    extraData: null,
    inventorySettings: {
      stockLevelDisplay: "SHOW_WHEN_LOW",
      showOutOfStockMessage: true,
      defaultOutOfStockMessage: "\bSold out",
    },
    attributes: product?.attributes || null,
    related_ids: product.related_ids,
  };
};

export const convertListProduct = (products: WooCommerceProduct[]) => {
  return products?.map((product) => {
    return convertProduct(product);
  });
};

export const convertReviewProduct = (reviews: ReviewProduct[]) => {
  return reviews.map((review) => {
    return {
      email: review.reviewer_email,
      displayName: review.reviewer,
      date: review.date_created,
      rating: review.rating,
      message: review.review,
      id: review.id,
      title: "",
      images: [],
      reply: [],
    };
  });
};

export const convertReviewSummary = (reviews: ReviewProduct[], id: number) => {
  return {
    id: id,
    rating:
      reviews.reduce((item, currentValue) => item + currentValue.rating, 0) /
      reviews.length,
    count: reviews.length,
  };
};

export const convertCustomerUser = (user: WoocommerceUser) => {
  return {
    id: user.id,
    company: "",
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    phone: user.billing.phone,
    storeCredit: "",
    customerGroupId: "",
    notes: "",
    taxExemptCategory: "",
    resetPassOnLogin: false,
    acceptsMarketing: false,
    storeCreditDisplayValue: "",
  };
};
