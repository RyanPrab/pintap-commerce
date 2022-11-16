import styled from 'styled-components';

const Section = styled.div.attrs((props) => ({
  className: `flex w-full h-8 items-center ${props.status === 'success' ? 'bg-success' : 'bg-error'}`
}))``;

const Container = styled.div.attrs(() => ({
  className: `container flex flex-row justify-between mx-auto`
}))``;

const Title = styled.div.attrs(() => ({
  className: `text-base text-white`
}))``;

const Message = styled.div.attrs(() => ({
  className: `text-base text-white`
}))``;


export default function Notification(props) {
  const { status, title, message} = props;

  return (
    <Section
      status={status}
    >
      <Container>
        <Title>
          {title}
        </Title>
        <Message>
          {message}
        </Message>
      </Container>
    </Section>
  )
}
