import gsap, { Power3 } from "gsap";
// target : 효과를 적용할 대상 요소
// fromvVars : 애니메이션 시작시의 속성을 설정하는 객체
// toVars : 애니메이션 종료시의 속성을 설정하는 객체
export const stagger = (target, fromvVars, toVars) => {
  return gsap.fromTo(
    target,
    { opacity: 0, ...fromvVars }, // 시작시의 opacity의 값을0
    { opacity: 1, ...toVars, stagger: 0.2, ease: Power3.easeOut } // 끝날시의 opacity값을 1
  );// stagger: 0.2  애니메이션을 적용하는 대상 요소들 간의 0.2초의 간격
    // ease: Power3.easeOut 애니메이션의 이징을 설정, Power3.easeOut는 일반적인 이징중하나
    // 빠르게시작해서 완료시에는 천천히 끝나도록
};
