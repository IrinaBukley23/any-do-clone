import { useState } from 'react';
import styles from './quotes.module.scss';

interface IQuote {
  text: string,
  author: string
}

const Quotes = () => {

  const [quote, setQuote] = useState<IQuote | null>(null);

  async function getRandomQuote() {
    try {
      const url = 'http://localhost:8080/api/quotes/random'
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setQuote(data);
    } catch(error) {
      console.log(error);
    }
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