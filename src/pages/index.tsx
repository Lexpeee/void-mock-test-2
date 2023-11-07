import PostCard from '@/components/Post/PostCard'
import useApi from '@/hooks/useApi'
import { 
  Container, 
  Grid,
  Title ,
  TextInput,
  Text,
} from '@mantine/core'
import { map, size } from 'lodash'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { useDebouncedCallback } from 'use-debounce'

export default function Home() {
  const router = useRouter()
  const {
    data: posts,
    isLoading,
    fetch: getPosts,
    error,
  } = useApi('getPosts')

  const [page, setPage] = useState(1)
  const [searchInput, setSearchInput] = useState('')

  const fetchPosts = useDebouncedCallback(async () => {
    try {

      let queries:any = {
        page: page, 
        limit: 5,
        sortBy: 'createdAt',
        order: 'desc',
        search: searchInput
      }

      await getPosts({
        queries: queries
      })

    } catch (err) {
      console.error(err)
    } finally { 
      setPage(prevState => prevState + 1)
    }
  }, 500)
  
  useEffect(()=>{
    if (!searchInput) {
      fetchPosts()
      setPage(1)
      return
    }
    fetchPosts()
  }, [searchInput])

  useEffect(()=>{
    fetchPosts()
  }, [])
  
  return (
    <>
      <main>
        <Container>
          <Title
            fw={600}
          >
            Posts
          </Title>
          <Grid>
            <Grid.Col span={12}>
              <TextInput
                value={searchInput}
                onChange={e => setSearchInput(e?.target?.value)}
              />
            </Grid.Col>
          </Grid>
          {/* Posts List */}
          <Grid>
            <InfiniteScroll
              dataLength={size(posts)}
              next={fetchPosts}
              hasMore={!!size(posts)}
              loader="Loading..."
              endMessage=""
            >
              {map(posts, (post, i) => {
                return <Grid.Col 
                  span={12} 
                  key={i}
                  onClick={() => router.push(`/posts/${post?.id}`)}
                > 
                  <PostCard
                    post={post}
                  />
                </Grid.Col>
              })}
            </InfiniteScroll>
          </Grid>
        </Container>
      </main>
    </>
  )
}
