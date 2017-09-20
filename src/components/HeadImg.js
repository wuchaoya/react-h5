/**
 * Created by chao on 2017/9/5.
 */
import styled from 'styled-components';

export default styled.span`
  border-radius:0.12rem;
  width: 0.74rem;
  height: 0.74rem;
  margin: 0.2rem 0.18rem 0.2rem 0.2rem;
  background: url('${(props) => props.uri}') no-repeat;
  background-size: 0.74rem;
  display: inline-block
  `;
