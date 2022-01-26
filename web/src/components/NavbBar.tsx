import { Box, Button, Flex, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';
interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer()
  });
  let body = null;

  // data is loading
  if (fetching) {
    body = null;
    // user not logged in
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link color='white' mr={2}>login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link color='white'>register</Link>
        </NextLink>
      </>
    );
    // user is logged in
  } else {
    body = (
      <Flex zIndex={1} position="sticky" bg="tan" p={4} top="0">
        <Box mr={2}>
          <NextLink href="/create-post">
            <Link color='white' mr={2}>Create Post</Link>
          </NextLink>
        </Box>
        <Box mr={2}>{data.me.username}</Box>
        <Button variant="link" onClick={() => {
          logout();
        }} isLoading={logoutFetching}>logout</Button>
    </Flex>)
  }
  return (
    <Flex bg='tomato' p={4}>
      <Box ml='auto'>
        {body}
      </Box>
    </Flex>
  );
}
