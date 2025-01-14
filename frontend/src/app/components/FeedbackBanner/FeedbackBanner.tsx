import styles from "./FeedbackBanner.module.css";

export default function FeedbackBanner() {
  return (
    <section className={`${styles.section} outer-grid`}>
      <div className={`inner-grid`}>
        <div className={`${styles.mainLayout} `}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            viewBox="0 0 27.48 24.982"
          >
            <path
              id="feedback-icon-big"
              d="M20.981,0a4.055,4.055,0,0,0-3.6,2.3C15.872,5.44,19.1,8.363,20.322,9.466l.2.185a22.917,22.917,0,0,0,1.913,1.5,1.362,1.362,0,0,0,1.6,0,22.917,22.917,0,0,0,1.913-1.5l.2-.185c1.22-1.1,4.45-4.025,2.937-7.163a4.055,4.055,0,0,0-3.6-2.3,4.186,4.186,0,0,0-2.254.654A4.186,4.186,0,0,0,20.981,0Zm0,2.5A3.664,3.664,0,0,1,23.22,3.3,3.435,3.435,0,0,1,25.484,2.5a1.5,1.5,0,0,1,1.5,1.5c0,1.347-1.825,3-2.513,3.616l-.229.215c-.317.293-.688.6-1.005.849-.317-.249-.693-.556-1.01-.849L22,7.612c-.688-.62-2.513-2.269-2.513-3.616A1.5,1.5,0,0,1,20.985,2.5ZM4.5,5A2.491,2.491,0,0,0,2.029,7.2l12.462,7.787,4.87-3.045c-.185-.151-.366-.3-.517-.444l-.2-.181Q15.077,8.085,14.569,5ZM2,9.681v12.8a2.5,2.5,0,0,0,2.5,2.5H24.484a2.5,2.5,0,0,0,2.5-2.5V12.052c-.961.776-2.166,1.61-2.332,1.727l-.732.5a1.205,1.205,0,0,1-1.366,0l-.732-.5c-.068-.049-.322-.224-.654-.464l-6.011,3.762a1.273,1.273,0,0,1-1.327,0Zm0,0"
              transform="translate(-2)"
              fill="#fff"
            />
          </svg>
          <div>
            <h3 className="montserrat-bold">Hvad synes du om Musik Samspil?</h3>
            <p className="montserrat-regular">
              Vi vil gerne høre fra dig, hvis du har ideer til hvordan vi kan
              gøre oplevelsen bedre.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
