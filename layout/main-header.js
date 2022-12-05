import classes from './main-header.module.css';

function MainHeader() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        Motovun film festival
      </div>
    </header>
  );
}

export default MainHeader;
