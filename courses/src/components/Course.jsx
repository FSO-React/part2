import Header from './Header';
import Content from './Content';

const Course = ({ name, parts }) => {                                 
    return (
        <div>
            <Header text={name}></Header>
            <Content parts={parts}></Content>
        </div>
    )
}

export default Course;

