import React from 'react'
import topImg from '../../assets/img/topBanner3.png';
import { BannerContainer, TopImage } from './TopBannerStyles';

export default function TopBanner() {
  return (
    <BannerContainer>
      <TopImage src={topImg} alt="소녀시대 소개 이미지" />
    </BannerContainer>
  )
}
