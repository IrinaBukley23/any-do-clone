import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../../types/types';
import { quotesEn } from '../../../quotes/quotes-en';
import { quotesRu } from '../../../quotes/quotes-ru';

import styles from './quotes.module.scss';

interface IQuote {
  author: string
  text: string
}

const Quotes = () => {

  const [quote, setQuote] = useState<IQuote | null>(null);
  const { lang } = useSelector((state: State) => state.lang);

  useEffect(() => {
    getRandomQuote();
  }, [lang])

  function getRandomQuote() {
    const randomEn = quotesEn[Math.floor(Math.random() * quotesEn.length)];
    const randomRu = quotesRu[Math.floor(Math.random() * quotesRu.length)];
   (lang === 'ru') ? setQuote(randomRu) : setQuote(randomEn);
  }
  
  if (quote === null) {
    getRandomQuote()
  }
  return (
    <div className={styles.header__quote}>
      {quote && `"${quote.text}" ${quote.author}`}
    </div>
  )
}

export default Quotes