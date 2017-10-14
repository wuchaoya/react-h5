/**
 * Created by chao on 2017/9/25.
 */
import styled from 'styled-components';

export default styled.span`
  margin: ${(props) => props.margin};
  display: block;
  font-size: ${(props) => props.fontSize};
  font-weight: 400;
  color: ${(props) => props.color}
  `;
