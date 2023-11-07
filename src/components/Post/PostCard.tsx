import { Avatar, Card, Flex, Group, Image, Text, Title } from '@mantine/core'
import { capitalize } from 'lodash'
import moment from 'moment'
import { FC } from 'react'

type PostCardProps = {
  post: any
  onItemClick?: () => void
}

const PostCard:FC<PostCardProps> = ({
  post,
  onItemClick
}) => {
  return (
    <Card 
      shadow="sm" 
      padding="lg" 
      radius="md" 
      withBorder
      onClick={onItemClick}
    >
      <Flex direction={'column'}>
        <Group>
          <Avatar
            src={post?.authorAvatar}
          />
          <div>
            <Title order={6}>{post?.authorName}</Title>
            <Text>{moment(post?.createdAt).fromNow()}</Text>
          </div>
        </Group>
      </Flex>

      <Flex 
        direction='column'
        style={{
          padding: '30px'
        }}
      >
        <Card.Section>
          <Group justify='space-between'>
            <Text>{capitalize(post?.postText)}</Text>
          </Group>
        </Card.Section>
        <Card.Section>
          <Image
            src={post?.postImage}
          />
        </Card.Section>
      </Flex>
    </Card>
  )
}

export default PostCard