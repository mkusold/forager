import styled from "@emotion/styled";

const TOPBAR_HEIGHT = 0;

export const useStyles = () => ({
  map: styled.div({
    height: `calc(100vh - ${TOPBAR_HEIGHT}px)`,
    overflow: 'hidden',
  }),
});
