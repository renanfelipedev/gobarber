import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  cursor: pointer;

  span {
    width: 240px;
    background: #ff9000;
    color: #312e38;
    padding: 8px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.4s;

    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);

    &::before {
      content: '';
      border-style: solid;
      border-color: #ff9000 transparent;
      border-width: 6px 6px 0 6px;
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
