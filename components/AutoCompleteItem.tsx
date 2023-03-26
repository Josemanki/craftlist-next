import { Avatar, Group, Text } from '@mantine/core';
import { forwardRef } from 'react';
import { ImageUrls } from '../types';

interface AutoCompleteItemProps {
  value: string;
  image_urls: ImageUrls;
}

// eslint-disable-next-line react/display-name
export const AutoCompleteItem = forwardRef<
  HTMLDivElement,
  AutoCompleteItemProps
>(({ value, image_urls, ...others }: AutoCompleteItemProps, ref) => (
  <div ref={ref} {...others}>
    <Group noWrap>
      <Avatar src={image_urls.icon} />
      <div>
        <Text>{value}</Text>
      </div>
    </Group>
  </div>
));
