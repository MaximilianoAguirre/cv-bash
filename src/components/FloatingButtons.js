import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { GrDocumentPdf, GrDocumentUser } from 'react-icons/gr';

import "css/floating_button.css"

export const FloatingButtons = ({baseStyle}) => {
    return <>
        <a
            className="float-button"
            href="https://github.com/MaximilianoAguirre"
            target="_blank"
            rel='noreferrer'
            style={{
                ...baseStyle,
                top: "20px"
            }}
        >
            <FaGithub className='float-icon' />
        </a>

        <a
            className="float-button"
            href="https://www.linkedin.com/in/maximilianoaguirre/"
            rel='noreferrer'
            target="_blank"
            style={{
                ...baseStyle,
                top: "70px"
            }}
        >
            <FaLinkedinIn className='float-icon' />
        </a>

        <a
            className="float-button"
            href="mailto:maximiliano.aguirre@outlook.es"
            rel='noreferrer'
            target="_blank"
            style={{
                ...baseStyle,
                top: "120px"
            }}
        >
            <FiMail className='float-icon' />
        </a>

        <a
            className="float-button"
            href={`${window.location.href}cv.pdf`}
            rel='noreferrer'
            target="_blank"
            style={{
                ...baseStyle,
                top: "170px"
            }}
        >
            <GrDocumentPdf className='float-icon' />
        </a>

        <a
            className="float-button"
            href={'https://www.maximilianoaguirre.com'}
            rel='noreferrer'
            target="_blank"
            style={{
                ...baseStyle,
                top: "220px"
            }}
        >
            <GrDocumentUser className='float-icon' />
        </a>
    </>
}
