// Design Patterns Data
window.translations = {
  pt: {
    nav: {
      home: 'Início',
      patterns: 'Padrões',
      about: 'Sobre',
      contact: 'Contato'
    },
    hero: {
      badge: 'Referência em Design Patterns',
      title: 'Padrões de Projeto',
      subtitle: 'para Desenvolvedores Modernos',
      description: 'Guia completo de Design Patterns com exemplos em Java, C#, Python e Ruby. Aprenda os 22 padrões clássicos do GoF com explicações claras e código prático.',
      cta1: 'Explorar Padrões',
      cta2: 'Sobre o Autor'
    },
    categories: {
      title: 'Três Categorias Fundamentais',
      description: 'Os padrões GoF são organizados em três categorias, cada uma abordando um aspecto diferente do design de software.',
      creational: {
        icon: '🏗️',
        name: 'Criacionais',
        desc: 'Padrões que lidam com mecanismos de criação de objetos'
      },
      structural: {
        icon: '🔧',
        name: 'Estruturais',
        desc: 'Padrões que lidam com composição de classes e objetos'
      },
      behavioral: {
        icon: '⚡',
        name: 'Comportamentais',
        desc: 'Padrões que lidam com comunicação entre objetos'
      }
    },
    patterns: {
      search: 'Buscar padrão...',
      all: 'Todos',
      intent: 'INTENT',
      problem: 'PROBLEMA',
      solution: 'SOLUÇÃO',
      applicability: 'APLICABILIDADE',
      consequences: 'CONSEQUÊNCIAS',
      copy: 'Copiar',
      copied: 'Copiado!'
    },
    codeShowcase: {
      badge: 'Código Real, Exemplos Práticos',
      title: 'Aprenda com código real',
      description: 'Cada padrão vem com exemplos completos e funcionais em Java, C#, Python e Ruby. Código limpo, comentado e pronto para usar em seus projetos.'
    },
    resources: {
      badge: 'Recursos & Referências',
      title: 'Aprenda Mais',
      description: 'Recursos curados para aprofundar seu conhecimento em Design Patterns e arquitetura de software.'
    },
    about: {
      badge: 'Sobre o Autor',
      name: 'Angelo Marques',
      role: 'Tech Lead & Full Stack Developer',
      location: 'Serra, Espírito Santo, Brasil',
      bio: 'Sou Desenvolvedor Full Stack com mais de 17 anos de experiência na área de Tecnologia. Nos últimos 10 anos venho me especializando em desenho de arquitetura de aplicações web, API REST, Mobile e Windows. Atuo com metodologia ágil e Scrum, utilizando padrões como TDD, DDD, BDD, SOLID, Clean Code e Clean Architecture. Tenho habilidade em levantamento e documentação técnica.',
      experience: 'Experiência',
      technologies: 'Tecnologias',
      linkedin: 'Conectar no LinkedIn'
    }
  },
  en: {
    nav: {
      home: 'Home',
      patterns: 'Patterns',
      about: 'About',
      contact: 'Contact'
    },
    hero: {
      badge: 'Design Patterns Reference',
      title: 'Design Patterns',
      subtitle: 'for Modern Developers',
      description: 'Complete guide to Design Patterns with examples in Java, C#, Python and Ruby. Learn the 22 classic GoF patterns with clear explanations and practical code.',
      cta1: 'Explore Patterns',
      cta2: 'About the Author'
    },
    categories: {
      title: 'Three Fundamental Categories',
      description: 'GoF patterns are organized into three categories, each addressing a different aspect of software design.',
      creational: {
        icon: '🏗️',
        name: 'Creational',
        desc: 'Patterns that deal with object creation mechanisms'
      },
      structural: {
        icon: '🔧',
        name: 'Structural',
        desc: 'Patterns that deal with class and object composition'
      },
      behavioral: {
        icon: '⚡',
        name: 'Behavioral',
        desc: 'Patterns that deal with object communication'
      }
    },
    patterns: {
      search: 'Search pattern...',
      all: 'All',
      intent: 'INTENT',
      problem: 'PROBLEM',
      solution: 'SOLUTION',
      applicability: 'APPLICABILITY',
      consequences: 'CONSEQUENCES',
      copy: 'Copy',
      copied: 'Copied!'
    },
    codeShowcase: {
      badge: 'Real Code, Practical Examples',
      title: 'Learn with real code',
      description: 'Each pattern comes with complete, working examples in Java, C#, Python and Ruby. Clean, commented code ready to use in your projects.'
    },
    resources: {
      badge: 'Resources & References',
      title: 'Learn More',
      description: 'Curated resources to deepen your knowledge in Design Patterns and software architecture.'
    },
    about: {
      badge: 'About the Author',
      name: 'Angelo Marques',
      role: 'Tech Lead & Full Stack Developer',
      location: 'Serra, Espírito Santo, Brazil',
      bio: 'I am a Full Stack Developer with over 17 years of experience in Technology. Over the last 10 years I have been specializing in web application architecture design, REST APIs, Mobile and Windows. I work with agile methodology and Scrum, using patterns such as TDD, DDD, BDD, SOLID, Clean Code and Clean Architecture. I have skills in technical survey and documentation.',
      experience: 'Experience',
      technologies: 'Technologies',
      linkedin: 'Connect on LinkedIn'
    }
  }
};

window.patterns = [
  {
    id: 'singleton',
    name: 'Singleton',
    category: 'creational',
    icon: '⬡',
    intent_pt: 'Garante que uma classe tenha apenas uma instância e fornece um ponto de acesso global a ela.',
    intent_en: 'Ensures a class has only one instance and provides a global access point to it.',
    problem_pt: 'Você precisa que uma classe tenha apenas uma instância, enquanto fornece um ponto de acesso global a essa instância.',
    problem_en: 'You need a class to have only one instance, while providing a global access point to that instance.',
    solution_pt: 'Torne o construtor padrão privado para evitar que outros objetos usem o operador new com a classe Singleton. Crie um método de criação estática que atue como um construtor.',
    solution_en: 'Make the default constructor private to prevent other objects from using the new operator with the Singleton class. Create a static creation method that acts as a constructor.',
    java: `public class DatabaseConnection {
    private static DatabaseConnection instance;
    
    private DatabaseConnection() {}
    
    public static synchronized 
    DatabaseConnection getInstance() {
        if (instance == null) {
            instance = new DatabaseConnection();
        }
        return instance;
    }
}`,
    csharp: `public class DatabaseConnection {
    private static DatabaseConnection _instance;
    private static readonly object _lock = new object();
    
    private DatabaseConnection() { }
    
    public static DatabaseConnection GetInstance() {
        if (_instance == null) {
            lock (_lock) {
                if (_instance == null) {
                    _instance = new DatabaseConnection();
                }
            }
        }
        return _instance;
    }
}`,
    python: `class DatabaseConnection:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

db = DatabaseConnection()`,
    ruby: `class DatabaseConnection
    @@instance = nil
    
    private_class_method :new
    
    def self.instance
        @@instance ||= new
    end
end

db = DatabaseConnection.instance`
  },
  {
    id: 'factory-method',
    name: 'Factory Method',
    category: 'creational',
    icon: '⬢',
    intent_pt: 'Define uma interface para criar um objeto, mas deixa as subclasses decidirem qual classe instanciar.',
    intent_en: 'Defines an interface for creating an object, but lets subclasses decide which class to instantiate.',
    problem_pt: 'Você tem uma classe que funciona com objetos de uma superclasse, mas você não sabe antecipadamente qual subclasse específica ela precisará.',
    problem_en: 'You have a class that works with objects of a superclass, but you do not know in advance which specific subclass it will need.',
    solution_pt: 'Extraia a criação de objetos para um método separado chamado factory method. Mova a criação de objetos para uma subclasse.',
    solution_en: 'Extract object creation to a separate method called factory method. Move object creation to a subclass.',
    java: `public abstract class Creator {
    public abstract Product factoryMethod();
    
    public void businessLogic() {
        Product product = factoryMethod();
        product.operation();
    }
}

public class ConcreteCreator extends Creator {
    @Override
    public Product factoryMethod() {
        return new ConcreteProduct();
    }
}`,
    csharp: `public abstract class Creator {
    public abstract Product FactoryMethod();
    
    public void BusinessLogic() {
        Product product = FactoryMethod();
        product.Operation();
    }
}

public class ConcreteCreator : Creator {
    public override Product FactoryMethod() {
        return new ConcreteProduct();
    }
}`,
    python: `from abc import ABC, abstractmethod

class Creator(ABC):
    @abstractmethod
    def factory_method(self):
        pass
    
    def business_logic(self):
        product = self.factory_method()
        product.operation()

class ConcreteCreator(Creator):
    def factory_method(self):
        return ConcreteProduct()`,
    ruby: `class Creator
    def factory_method
        raise NotImplementedError
    end
    
    def business_logic
        product = factory_method
        product.operation
    end
end

class ConcreteCreator < Creator
    def factory_method
        ConcreteProduct.new
    end
end`
  },
  {
    id: 'observer',
    name: 'Observer',
    category: 'behavioral',
    icon: '◎',
    intent_pt: 'Define uma dependência um-para-muitos entre objetos de modo que quando um objeto muda de estado, todos os seus dependentes são notificados automaticamente.',
    intent_en: 'Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified automatically.',
    problem_pt: 'Você tem um objeto que precisa notificar outros objetos sobre mudanças em seu estado, mas você não quer que ele seja acoplado a essas classes.',
    problem_en: 'You have an object that needs to notify other objects about changes in its state, but you do not want it to be coupled to those classes.',
    solution_pt: 'Crie uma interface Observer que defina o método de notificação. Implemente essa interface em todas as classes que precisam ser notificadas.',
    solution_en: 'Create an Observer interface that defines the notification method. Implement this interface in all classes that need to be notified.',
    java: `public interface Observer {
    void update(Subject subject);
}

public class Subject {
    private List<Observer> observers = new ArrayList<>();
    
    public void attach(Observer observer) {
        observers.add(observer);
    }
    
    public void notifyObservers() {
        for (Observer observer : observers) {
            observer.update(this);
        }
    }
}`,
    csharp: `public interface IObserver {
    void Update(Subject subject);
}

public class Subject {
    private List<IObserver> _observers = new List<IObserver>();
    
    public void Attach(IObserver observer) {
        _observers.Add(observer);
    }
    
    public void NotifyObservers() {
        foreach (var observer in _observers) {
            observer.Update(this);
        }
    }
}`,
    python: `class Observer:
    def update(self, subject):
        pass

class Subject:
    def __init__(self):
        self._observers = []
    
    def attach(self, observer):
        self._observers.append(observer)
    
    def notify(self):
        for observer in self._observers:
            observer.update(self)`,
    ruby: `class Observer
    def update(subject)
        raise NotImplementedError
    end
end

class Subject
    def initialize
        @observers = []
    end
    
    def attach(observer)
        @observers << observer
    end
    
    def notify
        @observers.each { |obs| obs.update(self) }
    end
end`
  },
  {
    id: 'strategy',
    name: 'Strategy',
    category: 'behavioral',
    icon: '◆',
    intent_pt: 'Define uma família de algoritmos, encapsule cada um e torne-os intercambiáveis.',
    intent_en: 'Define a family of algorithms, encapsulate each one, and make them interchangeable.',
    problem_pt: 'Você tem uma classe que executa uma tarefa específica de várias maneiras diferentes, dependendo de algum parâmetro.',
    problem_en: 'You have a class that performs a specific task in several different ways, depending on some parameter.',
    solution_pt: 'Extraia os algoritmos para classes separadas chamadas estratégias. Crie uma interface comum para todas as estratégias.',
    solution_en: 'Extract the algorithms to separate classes called strategies. Create a common interface for all strategies.',
    java: `public interface PaymentStrategy {
    void pay(double amount);
}

public class CreditCardPayment implements PaymentStrategy {
    public void pay(double amount) {
        System.out.println("Paying " + amount + " with credit card");
    }
}

public class PaymentProcessor {
    private PaymentStrategy strategy;
    
    public PaymentProcessor(PaymentStrategy strategy) {
        this.strategy = strategy;
    }
    
    public void process(double amount) {
        strategy.pay(amount);
    }
}`,
    csharp: `public interface IPaymentStrategy {
    void Pay(double amount);
}

public class CreditCardPayment : IPaymentStrategy {
    public void Pay(double amount) {
        Console.WriteLine($"Paying {amount} with credit card");
    }
}

public class PaymentProcessor {
    private IPaymentStrategy _strategy;
    
    public PaymentProcessor(IPaymentStrategy strategy) {
        _strategy = strategy;
    }
    
    public void Process(double amount) {
        _strategy.Pay(amount);
    }
}`,
    python: `class PaymentStrategy:
    def pay(self, amount):
        pass

class CreditCardPayment(PaymentStrategy):
    def pay(self, amount):
        print(f"Paying {amount} with credit card")

class PaymentProcessor:
    def __init__(self, strategy):
        self._strategy = strategy
    
    def process(self, amount):
        self._strategy.pay(amount)`,
    ruby: `class PaymentStrategy
    def pay(amount)
        raise NotImplementedError
    end
end

class CreditCardPayment < PaymentStrategy
    def pay(amount)
        puts "Paying #{amount} with credit card"
    end
end

class PaymentProcessor
    def initialize(strategy)
        @strategy = strategy
    end
    
    def process(amount)
        @strategy.pay(amount)
    end
end`
  },
  {
    id: 'decorator',
    name: 'Decorator',
    category: 'structural',
    icon: '◉',
    intent_pt: 'Anexa responsabilidades adicionais a um objeto dinamicamente. Os decoradores fornecem uma alternativa flexível à subclassificação para estender a funcionalidade.',
    intent_en: 'Attach additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality.',
    problem_pt: 'Você tem uma classe que precisa ter funcionalidades adicionadas a ela, mas você não quer usar herança porque isso criaria muitas subclasses.',
    problem_en: 'You have a class that needs additional functionality added to it, but you do not want to use inheritance because it would create many subclasses.',
    solution_pt: 'Crie uma classe decoradora que envolve o objeto original e adiciona novas funcionalidades a ele.',
    solution_en: 'Create a decorator class that wraps the original object and adds new functionality to it.',
    java: `public interface Component {
    String operation();
}

public class Decorator implements Component {
    protected Component component;
    
    public Decorator(Component component) {
        this.component = component;
    }
    
    public String operation() {
        return component.operation();
    }
}

public class ConcreteDecorator extends Decorator {
    public ConcreteDecorator(Component component) {
        super(component);
    }
    
    public String operation() {
        return "Decorated(" + super.operation() + ")";
    }
}`,
    csharp: `public interface IComponent {
    string Operation();
}

public class Decorator : IComponent {
    protected IComponent _component;
    
    public Decorator(IComponent component) {
        _component = component;
    }
    
    public virtual string Operation() {
        return _component.Operation();
    }
}

public class ConcreteDecorator : Decorator {
    public ConcreteDecorator(IComponent component) : base(component) { }
    
    public override string Operation() {
        return "Decorated(" + base.Operation() + ")";
    }
}`,
    python: `class Component:
    def operation(self):
        pass

class Decorator(Component):
    def __init__(self, component):
        self._component = component
    
    def operation(self):
        return self._component.operation()

class ConcreteDecorator(Decorator):
    def operation(self):
        return f"Decorated({self._component.operation()})"`,
    ruby: `class Component
    def operation
        raise NotImplementedError
    end
end

class Decorator < Component
    def initialize(component)
        @component = component
    end
    
    def operation
        @component.operation
    end
end

class ConcreteDecorator < Decorator
    def operation
        "Decorated(#{@component.operation})"
    end
end`
  },
  {
    id: 'adapter',
    name: 'Adapter',
    category: 'structural',
    icon: '⬡',
    intent_pt: 'Converte a interface de uma classe em outra interface que os clientes esperam. O Adapter permite que classes com interfaces incompatíveis trabalhem juntas.',
    intent_en: 'Convert the interface of a class into another interface clients expect. Adapter lets classes with incompatible interfaces work together.',
    problem_pt: 'Você tem uma classe que funciona bem, mas sua interface não é compatível com o código que precisa usá-la.',
    problem_en: 'You have a class that works well, but its interface is not compatible with the code that needs to use it.',
    solution_pt: 'Crie uma classe adaptadora que implemente a interface esperada e delegue as chamadas para a classe original.',
    solution_en: 'Create an adapter class that implements the expected interface and delegates calls to the original class.',
    java: `public interface Target {
    void request();
}

public class Adaptee {
    public void specificRequest() {
        System.out.println("Specific request");
    }
}

public class Adapter implements Target {
    private Adaptee adaptee;
    
    public Adapter(Adaptee adaptee) {
        this.adaptee = adaptee;
    }
    
    public void request() {
        adaptee.specificRequest();
    }
}`,
    csharp: `public interface ITarget {
    void Request();
}

public class Adaptee {
    public void SpecificRequest() {
        Console.WriteLine("Specific request");
    }
}

public class Adapter : ITarget {
    private Adaptee _adaptee;
    
    public Adapter(Adaptee adaptee) {
        _adaptee = adaptee;
    }
    
    public void Request() {
        _adaptee.SpecificRequest();
    }
}`,
    python: `class Target:
    def request(self):
        pass

class Adaptee:
    def specific_request(self):
        print("Specific request")

class Adapter(Target):
    def __init__(self, adaptee):
        self._adaptee = adaptee
    
    def request(self):
        self._adaptee.specific_request()`,
    ruby: `class Target
    def request
        raise NotImplementedError
    end
end

class Adaptee
    def specific_request
        puts "Specific request"
    end
end

class Adapter < Target
    def initialize(adaptee)
        @adaptee = adaptee
    end
    
    def request
        @adaptee.specific_request
    end
end`
  },
  {
    id: 'facade',
    name: 'Facade',
    category: 'structural',
    icon: '▣',
    intent_pt: 'Fornece uma interface unificada e simplificada para um conjunto de interfaces em um subsistema.',
    intent_en: 'Provide a unified and simplified interface to a set of interfaces in a subsystem.',
    problem_pt: 'Você tem um subsistema complexo com muitas classes interdependentes, e você quer fornecer uma interface simples para ele.',
    problem_en: 'You have a complex subsystem with many interdependent classes, and you want to provide a simple interface to it.',
    solution_pt: 'Crie uma classe Facade que fornece uma interface simples para o subsistema complexo.',
    solution_en: 'Create a Facade class that provides a simple interface to the complex subsystem.',
    java: `public class Facade {
    private SubsystemA subsystemA;
    private SubsystemB subsystemB;
    
    public Facade() {
        this.subsystemA = new SubsystemA();
        this.subsystemB = new SubsystemB();
    }
    
    public void operation() {
        subsystemA.operationA();
        subsystemB.operationB();
    }
}`,
    csharp: `public class Facade {
    private SubsystemA _subsystemA;
    private SubsystemB _subsystemB;
    
    public Facade() {
        _subsystemA = new SubsystemA();
        _subsystemB = new SubsystemB();
    }
    
    public void Operation() {
        _subsystemA.OperationA();
        _subsystemB.OperationB();
    }
}`,
    python: `class Facade:
    def __init__(self):
        self._subsystem_a = SubsystemA()
        self._subsystem_b = SubsystemB()
    
    def operation(self):
        self._subsystem_a.operation_a()
        self._subsystem_b.operation_b()`,
    ruby: `class Facade
    def initialize
        @subsystem_a = SubsystemA.new
        @subsystem_b = SubsystemB.new
    end
    
    def operation
        @subsystem_a.operation_a
        @subsystem_b.operation_b
    end
end`
  },
  {
    id: 'abstract-factory',
    name: 'Abstract Factory',
    category: 'creational',
    icon: '⬟',
    intent_pt: 'Fornece uma interface para criar famílias de objetos relacionados ou dependentes sem especificar suas classes concretas.',
    intent_en: 'Provide an interface for creating families of related or dependent objects without specifying their concrete classes.',
    problem_pt: 'Você tem múltiplas famílias de objetos relacionados e você quer criar uma delas sem especificar qual.',
    problem_en: 'You have multiple families of related objects and you want to create one of them without specifying which.',
    solution_pt: 'Crie uma interface de fábrica abstrata que define métodos para criar cada tipo de objeto. Implemente essa interface para cada família.',
    solution_en: 'Create an abstract factory interface that defines methods for creating each type of object. Implement this interface for each family.',
    java: `public interface AbstractFactory {
    ProductA createProductA();
    ProductB createProductB();
}

public class ConcreteFactory1 implements AbstractFactory {
    public ProductA createProductA() {
        return new ConcreteProductA1();
    }
    
    public ProductB createProductB() {
        return new ConcreteProductB1();
    }
}`,
    csharp: `public interface IAbstractFactory {
    IProductA CreateProductA();
    IProductB CreateProductB();
}

public class ConcreteFactory1 : IAbstractFactory {
    public IProductA CreateProductA() {
        return new ConcreteProductA1();
    }
    
    public IProductB CreateProductB() {
        return new ConcreteProductB1();
    }
}`,
    python: `class AbstractFactory:
    def create_product_a(self):
        pass
    
    def create_product_b(self):
        pass

class ConcreteFactory1(AbstractFactory):
    def create_product_a(self):
        return ConcreteProductA1()
    
    def create_product_b(self):
        return ConcreteProductB1()`,
    ruby: `class AbstractFactory
    def create_product_a
        raise NotImplementedError
    end
    
    def create_product_b
        raise NotImplementedError
    end
end

class ConcreteFactory1 < AbstractFactory
    def create_product_a
        ConcreteProductA1.new
    end
    
    def create_product_b
        ConcreteProductB1.new
    end
end`
  },
  {
    id: 'builder',
    name: 'Builder',
    category: 'creational',
    icon: '◈',
    intent_pt: 'Separa a construção de um objeto complexo de sua representação, permitindo que o mesmo processo de construção crie diferentes representações.',
    intent_en: 'Separate the construction of a complex object from its representation, allowing the same construction process to create different representations.',
    problem_pt: 'Você tem um objeto complexo que requer muitos passos para ser construído, e você quer evitar um construtor com muitos parâmetros.',
    problem_en: 'You have a complex object that requires many steps to construct, and you want to avoid a constructor with many parameters.',
    solution_pt: 'Crie uma classe Builder que constrói o objeto passo a passo. Use um método build() para retornar o objeto final.',
    solution_en: 'Create a Builder class that constructs the object step by step. Use a build() method to return the final object.',
    java: `public class Product {
    private String partA;
    private String partB;
    
    public Product(Builder builder) {
        this.partA = builder.partA;
        this.partB = builder.partB;
    }
    
    public static class Builder {
        private String partA;
        private String partB;
        
        public Builder partA(String partA) {
            this.partA = partA;
            return this;
        }
        
        public Builder partB(String partB) {
            this.partB = partB;
            return this;
        }
        
        public Product build() {
            return new Product(this);
        }
    }
}`,
    csharp: `public class Product {
    public string PartA { get; set; }
    public string PartB { get; set; }
}

public class Builder {
    private Product _product = new Product();
    
    public Builder PartA(string partA) {
        _product.PartA = partA;
        return this;
    }
    
    public Builder PartB(string partB) {
        _product.PartB = partB;
        return this;
    }
    
    public Product Build() {
        return _product;
    }
}`,
    python: `class Product:
    def __init__(self):
        self.part_a = None
        self.part_b = None

class Builder:
    def __init__(self):
        self._product = Product()
    
    def part_a(self, part_a):
        self._product.part_a = part_a
        return self
    
    def part_b(self, part_b):
        self._product.part_b = part_b
        return self
    
    def build(self):
        return self._product`,
    ruby: `class Product
    attr_accessor :part_a, :part_b
end

class Builder
    def initialize
        @product = Product.new
    end
    
    def part_a(part_a)
        @product.part_a = part_a
        self
    end
    
    def part_b(part_b)
        @product.part_b = part_b
        self
    end
    
    def build
        @product
    end
end`
  },
  {
    id: 'command',
    name: 'Command',
    category: 'behavioral',
    icon: '◇',
    intent_pt: 'Encapsula uma solicitação como um objeto, permitindo que você parametrize clientes com diferentes solicitações, enfileire solicitações e registre solicitações.',
    intent_en: 'Encapsulate a request as an object, allowing you to parameterize clients with different requests, queue requests, and log requests.',
    problem_pt: 'Você tem operações que precisam ser executadas em diferentes momentos, ou você quer ser capaz de desfazer operações.',
    problem_en: 'You have operations that need to be executed at different times, or you want to be able to undo operations.',
    solution_pt: 'Crie uma interface Command que defina o método execute(). Implemente essa interface para cada operação específica.',
    solution_en: 'Create a Command interface that defines the execute() method. Implement this interface for each specific operation.',
    java: `public interface Command {
    void execute();
}

public class ConcreteCommand implements Command {
    private Receiver receiver;
    
    public ConcreteCommand(Receiver receiver) {
        this.receiver = receiver;
    }
    
    public void execute() {
        receiver.action();
    }
}

public class Invoker {
    private Command command;
    
    public void setCommand(Command command) {
        this.command = command;
    }
    
    public void executeCommand() {
        command.execute();
    }
}`,
    csharp: `public interface ICommand {
    void Execute();
}

public class ConcreteCommand : ICommand {
    private Receiver _receiver;
    
    public ConcreteCommand(Receiver receiver) {
        _receiver = receiver;
    }
    
    public void Execute() {
        _receiver.Action();
    }
}

public class Invoker {
    private ICommand _command;
    
    public void SetCommand(ICommand command) {
        _command = command;
    }
    
    public void ExecuteCommand() {
        _command.Execute();
    }
}`,
    python: `class Command:
    def execute(self):
        pass

class ConcreteCommand(Command):
    def __init__(self, receiver):
        self._receiver = receiver
    
    def execute(self):
        self._receiver.action()

class Invoker:
    def __init__(self):
        self._command = None
    
    def set_command(self, command):
        self._command = command
    
    def execute_command(self):
        self._command.execute()`,
    ruby: `class Command
    def execute
        raise NotImplementedError
    end
end

class ConcreteCommand < Command
    def initialize(receiver)
        @receiver = receiver
    end
    
    def execute
        @receiver.action
    end
end

class Invoker
    def initialize
        @command = nil
    end
    
    def set_command(command)
        @command = command
    end
    
    def execute_command
        @command.execute
    end
end`
  }
];

window.categoryColors = {
  creational: '#3fb950',
  structural: '#d29922',
  behavioral: '#f85149'
};

// Exportar patterns também
window.patterns = window.patterns || [];
