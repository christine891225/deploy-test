import { Divider } from '@chakra-ui/react'
import { GlobalStyle } from './globalStyle';

export default function GroupHeader({
  groupName,
}) {
  return (
    <div>
      <GlobalStyle>
        <h3>{groupName}</h3>
      </GlobalStyle>
      <Divider borderColor={'black'} />
    </div>
  );
}