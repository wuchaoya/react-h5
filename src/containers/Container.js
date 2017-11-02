import styled from 'styled-components';

export default styled.div`
  background-color:${(props) => props.background ? props.background : '#ededed'};
  padding-bottom: ${(props) => props.marginBottom}rem;
  overflow:hidden;
  `;
