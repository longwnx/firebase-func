import {Variants, WooCommerceProduct} from "../models/Product";
import {ReviewProduct} from "../models/Review";
import {Order} from "../models/Order";
import {WoocommerceUser} from "../types/user";

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
    prices: {
      originalPrice: product.price,
      salePrice: product.sale_price,
    },
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
    // attributes: product?.attributes || null,
    related_ids: product.related_ids,
    productAttributes: product.attributes || null,
    variations: product.variations || [],
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

export const convertCustomerUser = (user: WoocommerceUser, phone: string) => {
  return {
    id: user.id,
    company: "",
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    phone: phone,
    storeCredit: "",
    customerGroupId: "",
    notes: "",
    taxExemptCategory: "",
    resetPassOnLogin: false,
    acceptsMarketing: false,
    storeCreditDisplayValue: "",
  };
};

export const convertOrderDetail = (item: Order) => {
  return {
    id: item.id,
    customerId: item.customer_id,
    dateCreated: item.date_created,
    dateModified: item.date_modified,
    statusId: 0,
    status: item.status,
    customStatus: item.status,
    subtotalExTax: item.total,
    subtotalIncTax: item.total_tax,
    subtotalTax: 0,
    baseShippingCost: item.shipping_total,
    shippingCostExTax: 0,
    shippingCostIncTax: 0,
    shippingCostTax: 0,
    shippingCostTaxClassId: 0,
    baseHandlingCost: 0,
    handlingCostExTax: 0,
    handlingCostIncTax: 0,
    handlingCostTax: 0,
    handlingCostTaxClassId: 0,
    baseWrappingCost: 0,
    wrappingCostExTax: 0,
    wrappingCostIncTax: 0,
    wrappingCostTax: 0,
    wrappingCostTaxClassId: 0,
    totalExTax: item.total,
    totalIncTax: item.total,
    totalTax: item.total_tax,
    itemsTotal: 1,
    itemsShipped: 0,
    paymentMethod: "Check",
    paymentStatus: "",
    refundedAmount: 0,
    orderIsDigital: false,
    storeCreditAmount: 0,
    giftCertificateAmount: 0,
    geoipCountry: "Viet Nam",
    geoipCountryIso2: "VN",
    currencyId: 2,
    currencyCode: "VND",
    currencyExchangeRate: "1.0000000000",
    defaultCurrencyId: 2,
    defaultCurrencyCode: "VND",
    staffNotes: "",
    customerMessage: "",
    discountAmount: item.discount_total,
    couponDiscount: item.discount_tax,
    shippingAddressCount: 1,
    isDeleted: false,
    billingAddress: {
      firstName: item.billing.first_name,
      lastName: item.billing.last_name,
      company: item.billing.company,
      street1: item.billing.address_1,
      street2: item.billing.address_2,
      city: item.billing.city,
      state: item.billing.state,
      zip: item.billing.postcode,
      country: item.billing.country,
      countryIso2: "",
      phone: item.billing.phone,
      email: item.billing.email,
    },
    shippingAddresses: [
      {
        id: 1,
        firstName: item.billing.first_name,
        lastName: item.billing.last_name,
        company: item.billing.company,
        street1: item.billing.address_1,
        street2: item.billing.address_2,
        city: item.billing.city,
        state: item.billing.state,
        zip: item.billing.postcode,
        country: item.billing.country,
        countryIso2: "",
        phone: item.billing.phone,
        email: item.billing.email,
        itemsTotal: item.line_items.reduce(
          (total, lineItem) => total + lineItem.quantity,
          0,
        ),
        itemsShipped: 0,
        shippingMethod: "Free Shipping",
      },
    ],
    products: item.line_items.map((product) => {
      return {
        id: product.id,
        orderId: item.id,
        productId: product.product_id,
        variantId: product.variation_id,
        name: product.name,
        sku: product.sku,
        basePrice: product.price,
        priceExTax: product.price,
        priceIncTax: product.price,
        priceTax: product.total_tax,
        baseTotal: product.price,
        totalExTax: product.price,
        totalIncTax: product.price,
        totalTax: product.price,
        weight: 1,
        quantity: product.quantity,
        baseCostPrice: 0,
        costPriceIncTax: 0,
        costPriceExTax: 0,
        costPriceTax: 0,
        ebayItemId: "",
        appliedDiscounts: [],
        productOptions:
          product.meta_data.map((item) => ({
            id: item.id,
            name: item?.display_key || "",
            option: item.value,
          })) || [],
        configurableFields: [],
        image: product?.image?.src || "",
      };
    }),
    cartId: "",
    deleted: false,
  };
};

export const convertCartItemProduct = (
  product: WooCommerceProduct,
  variants: Variants[],
) => {
  return {
    productId: product.id,
    sku: product.sku,
    name: product.name,
    url: product.external_url,
    taxable: false,
    imageUrl: product.images[0].src,
    discounts: [],
    discountAmount: 0,
    couponAmount: 0,
    listPrice: product.price,
    salePrice: product.sale_price,
    extendedListPrice: product.price,
    extendedSalePrice: product.sale_price,
    options: variants,
    brandName: null,
    taxClassId: 0,
    hasError: false,
    hasMessages: null,
    giftWrapping: null,
    requireShipping: false,
  };
};
