export default function FlowToken({ width = 30, height = 30 }) {
  return (
    <svg version="1.1" x="0px" y="0px" viewBox="0 0 30 30" width={width} height={height}>
      <g transform="scale(0.28)">
        <circle id="circle20" style={{ fill: '#00EF8B'}} cx="50" cy="50" r="50"/>
        <rect id="rect22" x="57.8" y="42.2" style={{ fill: '#FFFFFF' }} width="14.1" height="14.1"/>
        <path id="path24" style={{ fill: '#FFFFFF' }} d="M43.7,61.6c0,2.9-2.4,5.3-5.3,5.3s-5.3-2.4-5.3-5.3c0-2.9,2.4-5.3,5.3-5.3c0,0,0,0,0,0h5.3V42.2     h-5.3C27.7,42.2,19,50.9,19,61.6S27.7,81,38.4,81s19.4-8.7,19.4-19.4l0,0v-5.3H43.7V61.6z"/>
        <path id="path26" style={{ fill: '#FFFFFF' }} d="M63.1,35.1H79V21H63.1c-10.7,0-19.4,8.7-19.4,19.4v1.8h14.1v-1.8C57.8,37.5,60.2,35.1,63.1,35.1     z"/>
        <polygon id="polygon28" style={{ fill: '#16FF99' }} points="57.8,42.2 57.8,42.2 43.7,42.2 43.7,56.3 57.8,56.3    "/>
      </g>
    </svg>
  )
}