import { withUrqlClient } from 'next-urql';
import React from 'react';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { useRouter } from 'next/router';
import { usePostQuery } from '../../generated/graphql';
import Layout from '../../components/Layout';
import { Box, Heading } from '@chakra-ui/react';
import { useGetPostFromUrl } from '../../utils/useGetPostFromUrl';

const Post = ({}) => {
  const [{ data, error, fetching }] = useGetPostFromUrl();
  if (fetching) {
    return (
      <Layout><div>Loading...</div></Layout>
    );
  }

  if (error) {
    return (
      <Layout><div>{error.message}</div></Layout>
    );
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>
          could not find post
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Heading mb={4}>{data.post.title}</Heading>
      { data.post.text}
    </Layout>
  );
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
