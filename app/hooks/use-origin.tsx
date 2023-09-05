"use client";

import React, { useEffect, useState } from "react";

const UseOrigin = () => {
  const [Mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);
  const origin=typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';

  if (!Mounted){
    return ""
  }
  return origin;
};

export default UseOrigin;
