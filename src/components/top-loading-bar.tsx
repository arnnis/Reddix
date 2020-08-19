import React, { FC, useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import usePrevious from "../utils/hooks/usePrevious";
import { sleep } from "../utils/sleep";
import { useTheme } from "../contexts/theme/useTheme";

interface Props {
  active: boolean;
}

const TopLoadingBar: FC<Props> = ({ active }) => {
  const [progress, setProgress] = useState(0);
  const prevActive = usePrevious(active);
  const { theme } = useTheme();

  const run = () => {};

  useEffect(() => {
    if (active === true) {
      setProgress(65);
    }
    if (prevActive === true && active === false) {
      setProgress(100);
      sleep(100).then(() => setProgress(0));
    }
  }, [active]);

  return <LoadingBar color={theme.orange} progress={progress} height={3} />;
};

export default TopLoadingBar;
