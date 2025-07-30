import { useState } from 'react';
import styles from './collection.module.css';
import useImageStore from '@/store/useImageStore.js';
import {
  useEffect
} from 'react';
import useTitle from '@/hooks/useTitle';
import Waterfall from '@/components/Waterfall';

const Collection = () => {
  const { loading,images,fetchMore } = useImageStore();
  useEffect(() => {
    fetchMore();
    useTitle('收藏页');
  }, [])
  return (
    <>
      <Waterfall images={images} loading={loading} fetchMore={fetchMore} />
    </>
  )
}
export default Collection;