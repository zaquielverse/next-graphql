import React, { useState } from 'react';
import { NextPage } from 'next';
import { Form, Formik } from 'formik';
import { toErrorMap } from '../../utils/toErrorMap';
import InputField from '../../components/InputField';
import { Box, Button, Link } from '@chakra-ui/react';
import { Wrapper } from '../../components/Wrapper';
import { useChangePasswordMutation } from '../../generated/graphql';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import NextLink from 'next/link';

export const ChangePassword: NextPage<{ token: string }> = () => {
  const router = useRouter();
  const [,changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState('');
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            newPassword: values.newPassword,
            token: typeof router.query.token === 'string' ? router.query.token : ''
          })

          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if ('token' in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else if (response.data?.changePassword.user){
            // worked
            router.push('/');
          }
        }}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form>
            <InputField name="newPassword" placeholder="new password" label="new password" type="password" />
            {tokenError ? (
              <Box mr={2}>
                <Box color='red'>{tokenError}</Box>
                <NextLink href="/forgot-password">
                  <Link>
                    click here to get a new one
                  </Link>
                </NextLink>

              </Box>) : null}
            <Button mt={4} type="submit" isLoading={isSubmitting} variant="teal">change password</Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
}

export default withUrqlClient(createUrqlClient, { ssr: false })(ChangePassword);
