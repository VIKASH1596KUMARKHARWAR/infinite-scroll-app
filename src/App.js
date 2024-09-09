import React, { useState, useRef, useCallback } from 'react';
import './App.css';
import ItemList from './components/ItemList';
import BackToTopButton from './components/BackToTopButton';

const App = () => {
  const [visibleItems, setVisibleItems] = useState(10);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState(Array.from({ length: 200 }, (_, i) => `Item ${i + 1}`));
  const [hasMore, setHasMore] = useState(true);

  const listRef = useRef();

  const observer = useRef();
  const lastItemElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreItems();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const loadMoreItems = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleItems(prev => prev + 10);
      if (visibleItems >= items.length) {
        setHasMore(false);
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="app-container">
      <h1>Infinite Scroll List</h1>
      <div className="item-list" ref={listRef}>
        {items.slice(0, visibleItems).map((item, index) => {
          if (visibleItems === index + 1) {
            return <div ref={lastItemElementRef} className="item" key={item}>{item}</div>;
          } else {
            return <div className="item" key={item}>{item}</div>;
          }
        })}
        {loading && <div className="loading">Loading more items...</div>}
      </div>
      <BackToTopButton listRef={listRef} />
    </div>
  );
};

export default App;
