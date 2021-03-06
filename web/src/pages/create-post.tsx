import React, { useEffect } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import InputField from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useCreatePostMutation, useMeQuery } from '../generated/graphql';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import Layout from '../components/Layout';
import { useIsAuth } from '../utils/useIsAuth';

const CreatePost: React.FC<{}> = ({}) => {
  const router = useRouter();
  useIsAuth();

  const [, createPost] = useCreatePostMutation();
 return (
   <Layout variant="small">
     <Formik
       initialValues={{ title: "", text: "" }}
       onSubmit={async (values, { setErrors }) => {
         const { error} = await createPost({ input: values });
         if (!error) router.push('/');
       }}
     >
       {({ values, handleChange, isSubmitting }) =>(
         <Form>
           <InputField name="title" placeholder="title" label="title" />
           <Box mt={4}>
             <InputField name="text" placeholder="text..." label="Body" textarea />
           </Box>
           <Button mt={4} type="submit" isLoading={isSubmitting} variant="teal">Create Post</Button>
         </Form>
       )}
     </Formik>
   </Layout>
 );
}

export default withUrqlClient(createUrqlClient)(CreatePost);
