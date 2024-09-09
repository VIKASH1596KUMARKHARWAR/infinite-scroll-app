import React, { useEffect } from 'react';

const BackToTopButton = ({ listRef }) => {
  useEffect(() => {
    const handleScroll = () => {
      const button = document.querySelector('.back-to-top');
      if (listRef.current && listRef.current.scrollTop > 300) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    };

    const container = listRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [listRef]);

  const scrollToTop = () => {
    if (listRef.current) {
      listRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button className="back-to-top" onClick={scrollToTop}>
      Back to Top
    </button>
  );
};

export default BackToTopButton;
