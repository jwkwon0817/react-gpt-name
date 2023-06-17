import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Loading } from './components/Loading';

const App = () => {
	const [ isLoading, setIsLoading ] = useState(false);
	const usageList = [ 'Variable', 'Function', 'Class' ];
	const [ usage, setUsage ] = useState(usageList[0]);
	
	const [ description, setDescription ] = useState('');
	
	const caseList = [
		'None',
		'PascalCase',
		'camelCase',
		'snake_case',
		'kebab-case',
		'UPPER_CASE',
		'dot.case',
		'HungarianNotation',
	];
	const [ caseStyle, setCaseStyle ] = useState(caseList[0]);
	
	const languageList = [
		'JavaScript',
		'Python',
		'Java',
		'C++',
		'C#',
		'Ruby',
		'Go',
		'Swift',
		'TypeScript',
		'PHP',
		'Rust',
		'Kotlin',
		'Scala',
		'Perl',
		'Objective-C',
		'Shell',
		'HTML/CSS',
		'R',
		'Matlab',
		'Lua',
		'Haskell',
		'Groovy',
		'VB.NET',
		'Assembly',
		'Dart',
		'F#',
		'PowerShell',
		'Clojure',
		'Elixir',
		'Julia',
	];
	const [ language, setLanguage ] = useState(languageList[0]);
	
	const [ result, setResult ] = useState('');
	
	const handleUsageChange = (event) => {
		if (event.target.value === 'Class') {
			setCaseStyle('PascalCase');
		}
		
		localStorage.setItem('usage', event.target.value);
		setUsage(event.target.value);
	};
	
	const handleLanguageChange = (event) => {
		localStorage.setItem('language', event.target.value);
		setLanguage(event.target.value);
		
		if (usage !== 'Class') {
			switch (event.target.value) {
				case 'JavaScript':
				case 'Java':
				case 'C++':
				case 'Go':
				case 'Swift':
				case 'TypeScript':
				case 'PHP':
				case 'Kotlin':
				case 'Scala':
				case 'Perl':
				case 'Objective-C':
				case 'Shell':
				case 'HTML/CSS':
				case 'Matlab':
				case 'Lua':
				case 'Haskell':
				case 'Groovy':
				case 'Dart':
				case 'Julia':
					setCaseStyle('camelCase');
					break;
				case 'Python':
				case 'Ruby':
				case 'Rust':
				case 'R':
				case 'Clojure':
				case 'Elixir':
					setCaseStyle('snake_case');
					break;
				case 'C#':
				case 'VB.NET':
				case 'Assembly':
				case 'F#':
				case 'PowerShell':
					setCaseStyle('PascalCase');
					break;
				default:
					setCaseStyle('None');
			}
		}
	};
	
	const handleSubmit = (event) => {
		event.preventDefault();
		
		setIsLoading(true);
		axios.post('/name', {
				usage: usage,
				description: description,
				caseStyle: caseStyle,
				language: language,
			})
			.then((response) => {
				setIsLoading(false);
				localStorage.setItem('result', response.data.result);
				setResult(response.data.result);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	
	useEffect(() => {
		setUsage(localStorage.getItem('usage') || usageList[0]);
		setDescription(localStorage.getItem('description') || '');
		setCaseStyle(localStorage.getItem('caseStyle') || caseList[0]);
		setLanguage(localStorage.getItem('language') || languageList[0]);
		setResult(localStorage.getItem('result') || '');
	}, []);
	
	return (
		<div className={ 'App' }>
			<div className={ 'result-container' }>
				<h2 className="result">{ isLoading ? <Loading /> : result }</h2>
			</div>
			<div className="container">
				<form onSubmit={ handleSubmit } className="form-container">
					<div className="form-row">
						<label htmlFor="usage-select">Usage:</label>
						{
							usageList.map((item) => (
								<label key={ item } htmlFor={ item }>
									<input type={ 'radio' }
									       name={ 'usage' }
									       value={ item }
									       onChange={ handleUsageChange }
									       checked={ usage === item } />
									{ item }
								</label>
							))
						}
					</div>
					
					<div className="form-row">
						<label htmlFor="description-textarea">Description:</label>
						<textarea
							id="description-textarea"
							className="description-textarea"
							value={ description }
							onChange={ (event) => {
								localStorage.setItem('description', event.target.value);
								setDescription(event.target.value);
							} }
							placeholder={ 'Enter a description of your variable, function, or class.' }
							required
						/>
					</div>
					
					<div className="form-row">
						<label htmlFor="case-select">Case Style:</label>
						<select
							id="case-select"
							className="case-select"
							onChange={ (event) => {
								localStorage.setItem('caseStyle', event.target.value);
								setCaseStyle(event.target.value);
							} }
							value={ caseStyle }
						>
							{ caseList.map((item) => (
								<option key={ item } value={ item }>
									{ item }
								</option>
							)) }
						</select>
					</div>
					
					<div className="form-row">
						<label htmlFor="language-select">Language:</label>
						<select
							id="language-select"
							className="language-select"
							onChange={ handleLanguageChange }
							value={ language }
						>
							{ languageList.map((item) => (
								<option key={ item } value={ item }>
									{ item }
								</option>
							)) }
						</select>
					</div>
					
					<button type="submit" className="submit-button">
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default App;
