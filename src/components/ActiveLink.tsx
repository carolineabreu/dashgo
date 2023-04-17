import { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { ReactElement, cloneElement } from "react";

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  shouldMatchExactHref?: boolean;
}

export function ActiveLink({
  children,
  shouldMatchExactHref = false,
  ...rest
}: ActiveLinkProps) {
  const { asPath } = useRouter();
  let isActive = false;

  if (shouldMatchExactHref && (asPath === rest.href || asPath === rest.as)) {
    isActive = true;
  }

  // desse jeito pra poder deixar com cor a aba que está, mesmo que seja uma sub página
  // se não, no if de cima não precisaria passar o shouldMatchExactHref
  // desse jeito, se tiver uma rota que seja na / só, não pegaria
  if (
    !shouldMatchExactHref &&
    (asPath.startsWith(String(rest.href)) || asPath.startsWith(String(rest.as)))
  ) {
    isActive = true;
  }

  return (
    <>
      {cloneElement(children, {
        color: isActive ? "pink.400" : "gray.50",
        href: rest.href,
      })}
    </>
  );
}
