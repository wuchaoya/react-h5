/**
 * Created by chao on 2017/9/6.
 */
import styled from 'styled-components';

export default styled.nav`
  width: 100%;
  height: 0.88rem;
  background-color: rgba(22,22,22,${(props) => props.opacity});
  position: fixed;
  color: #fff;
  font-size: 0.28rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10
  `;
