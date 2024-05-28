import { configureStore } from "@reduxjs/toolkit";
import { articleReducer } from "./article.slice";
import { claimsReducer } from "./claims.slice";
import { clientReducer } from "./client.slice";
import { discountReducer } from "./discounts.slice";
import { furnitureReducer } from "./furniture.slice";
import { kitchensReducer } from "./kitchens.slice";
import { photoReducer } from "./photo.slice";
import { reviewReducer } from "./reviews.slice";
import { userReducer } from "./user.slice";
import { workerReducer } from "./worker.slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    client: clientReducer,
    claims: claimsReducer,
    kitchens: kitchensReducer,
    reviews: reviewReducer,
    workers: workerReducer,
    photos: photoReducer,
    articles: articleReducer,
    furniture: furnitureReducer,
    discounts: discountReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these field paths in all actions
        ignoredActionPaths: [
          "payload.config",
          "payload.request",
          "payload.headers",
          "error",
          "meta.arg",
        ],
      },
    }),
});

export default store;
