"use client";
import { Container, Text, Button, Group } from "@mantine/core";
import { GithubIcon } from "@mantinex/dev-icons";
import classes from "./HeroTitle.module.css";
import { useEffect, useRef, useState } from "react";
import { modals } from "@mantine/modals";

export default function Page() {
  const [{ isWakeLocked, wakelock }, setWakeLock] = useState<{
    isWakeLocked: boolean;
    wakelock: WakeLockSentinel | null;
  }>({
    isWakeLocked: false,
    wakelock: null,
  });

  return (
    <div className={classes.wrapper}>
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          Stay Alive:{" "}
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
            inherit
          >
            Wake Lock
          </Text>{" "}
          Control Panel
        </h1>

        <Text className={classes.description} color="dimmed">
          Prevent your screen from dimming, locking, or sleeping with just one
          click. Wake Lock One-Click ensures your screen stays active as long as
          your browser runs.
        </Text>

        <Group className={classes.controls}>
          <Button
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{
              from: isWakeLocked ? "red" : "blue",
              to: isWakeLocked ? "pink" : "cyan",
            }}
            onClick={async () => {
              if ("wakeLock" in navigator === false) {
                modals.openConfirmModal({
                  title: "Wake lock not supported",
                  children: (
                    <Text>Your browser does not support Wake Lock API.</Text>
                  ),
                  labels: {
                    cancel: "Close",
                    confirm: "Ok",
                  },
                });
                return;
              }
              if (isWakeLocked) {
                wakelock?.release();
                setWakeLock((prev) => {
                  return {
                    ...prev,
                    isWakeLocked: false,
                  };
                });
                return;
              }
              const temp = await navigator.wakeLock.request("screen");
              setWakeLock((prev) => {
                return {
                  ...prev,
                  isWakeLocked: true,
                  wakelock: temp,
                };
              });
            }}
          >
            {isWakeLocked ? "Disable Wake Lock" : "Enable Wake Lock"}
          </Button>

          <Button
            component="a"
            href="https://github.com/TitusEfferian/wakelock-web"
            size="xl"
            variant="default"
            className={classes.control}
            leftSection={<GithubIcon size={20} />}
          >
            GitHub
          </Button>
          <Button
            component="a"
            href="https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API"
            size="xl"
            variant="default"
            className={classes.control}
          >
            Learn More
          </Button>
        </Group>
      </Container>
    </div>
  );
}
