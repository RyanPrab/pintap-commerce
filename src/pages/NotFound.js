import styled from "styled-components";

const Section = styled.div.attrs(() => ({
  className: `flex justify-center w-full`
}))``;

export default function NotFound() {
  return (
    <Section>
      <div>
        Page not found!
      </div>
    </Section>
  )
}
