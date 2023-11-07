import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Container, Title } from '@mantine/core'

import PostCard from '@/components/Post/PostCard'
import useApi from '@/hooks/useApi'

const PostPage = () => {
  const router = useRouter()
  const { id } = router.query

  const {
    data: post,
    isLoading, 
    fetch: getPost,
    error,
  } = useApi('getPostDetails')
  
  const getPostDetails = async () => {
    try {
      getPost({
        params: {
          id: id
        }
      })
      // const { data } = await axios.get(`/posts/${id}`)
    } catch (err) {
      console.error(err)
    } 
  }
  
  useEffect(()=>{
    getPostDetails()
  }, [id])

  if (isLoading ) {
    return <Container>
      <Title order={1}>
        Loading..
      </Title>
    </Container>
  }
  
  return (
    <Container>
      <PostCard
        post={post}
      />
    </Container>
  )
}

export default PostPage