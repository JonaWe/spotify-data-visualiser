import React from 'react';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import {
  CopyrightArea,
  DescriptionArea,
  FooterBox,
  Hr,
  IconBox,
  SocialArea,
} from './Footer.styles';
import SocialLink from './SocialLink';

export default function Footer() {
  return (
    <FooterBox>
      <SocialArea>
        <IconBox>
          <SocialLink href="https://github.com/JonaWe">
            <FaGithub />
          </SocialLink>
          <SocialLink href="https://twitter.com/JonaWessendorf">
            <FaTwitter />
          </SocialLink>
        </IconBox>
      </SocialArea>
      <DescriptionArea>
        <p>
          If you are curious how I created this website, check out the source
          code on{' '}
          <a
            href="https://github.com/JonaWe/spotify-data-visualiser"
            target="_blank"
          >
            GitHub
          </a>
          .
        </p>
      </DescriptionArea>
      <Hr />
      <CopyrightArea>
        <p>&copy; 2021 Jona Wessendorf</p>
      </CopyrightArea>
    </FooterBox>
  );
}
