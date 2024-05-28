import ArticleService from "@/services/admin/ArticleService";
import { type IArticle } from "@/types/IArticle";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  articles: IArticle[];
  article: IArticle;
  isLoading: boolean;
  error: null | string;
};

const initialState: initialStateType = {
  articles: [],
  article: {} as IArticle,
  isLoading: false,
  error: null,
};

const articleSlice = createSlice({
  name: "kitchens",
  initialState,
  reducers: {
    setArticles(state, action: { payload: IArticle[]; type: string }) {
      state.articles = action.payload;
    },
    setArticle(state, action: { payload: IArticle; type: string }) {
      state.article = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Get articles
    builder.addCase(getArticles.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getArticles.fulfilled, (state, action) => {
      if (action.payload) {
        state.articles = action.payload;
      }
      state.isLoading = false;
    });
    builder.addCase(getArticles.rejected, (state, action) => {
      const error: any = action.payload;
      state.isLoading = false;
      state.error = error;
    });

    // Get review
    builder.addCase(getArticle.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getArticle.fulfilled, (state, action) => {
      if (action.payload) {
        state.article = action.payload;
      }
      state.isLoading = false;
    });
    builder.addCase(getArticle.rejected, (state, action) => {
      const error: any = action.payload;
      state.isLoading = false;
      state.error = error;
    });

    // Delete review
    builder.addCase(deleteArticle.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteArticle.fulfilled, (state, action) => {
      if (action.payload) {
        const articles = [...state.articles];

        articles.forEach(function (article, i) {
          if (article._id == action.payload?._id) {
            articles.splice(i, 1);
          }
        });

        state.articles = articles;
      }
      state.isLoading = false;
    });
    builder.addCase(deleteArticle.rejected, (state, action) => {
      const error: any = action.payload;
      state.isLoading = false;
      state.error = error;
    });
  },
});

export const getArticles = createAsyncThunk(
  "articles/getArticles",
  async () => {
    try {
      const response = await ArticleService.getArticles();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
);
export const getArticle = createAsyncThunk(
  "articles/getArticle",
  async (id: string) => {
    try {
      const response = await ArticleService.getArticle(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
);
export const deleteArticle = createAsyncThunk(
  "articles/deleteArticles",
  async (id: string) => {
    try {
      const response = await ArticleService.deleteArticle(id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const { setArticles, setArticle } = articleSlice.actions;

export const articleReducer = articleSlice.reducer;
