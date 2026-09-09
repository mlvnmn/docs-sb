import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { featuredArticle, topicCards, gazetteNavLinks, allNewsArticles } from '../data/gazette';
import type { NewsArticle } from '../types/content';

export function useNews() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [selectedCategory, setSelectedCategoryState] = useState<string>(() => {
    if (categoryParam) {
      const match = gazetteNavLinks.find(
        (l) => l.label.toLowerCase() === categoryParam.toLowerCase()
      );
      if (match) return match.label;
    }
    return 'All';
  });

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);

  useEffect(() => {
    if (categoryParam) {
      const match = gazetteNavLinks.find(
        (l) => l.label.toLowerCase() === categoryParam.toLowerCase()
      );
      if (match) {
        setSelectedCategoryState(match.label);
      }
    } else {
      setSelectedCategoryState('All');
    }
  }, [categoryParam]);

  const setSelectedCategory = (category: string) => {
    setSelectedCategoryState(category);
    const newParams = new URLSearchParams(searchParams);
    if (category === 'All') {
      newParams.delete('category');
    } else {
      newParams.set('category', category.toLowerCase());
    }
    setSearchParams(newParams, { replace: true });
  };

  const filteredArticles = useMemo(() => {
    return allNewsArticles.filter((article) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        article.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesSearch =
        !searchQuery ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (article.tags && article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return {
    featuredArticle,
    topicCards,
    gazetteNavLinks,
    allArticles: allNewsArticles,
    filteredArticles,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    activeArticle,
    openArticle: (article: NewsArticle) => setActiveArticle(article),
    closeArticle: () => setActiveArticle(null),
  };
}
