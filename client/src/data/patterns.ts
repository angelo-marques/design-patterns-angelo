// Design Patterns Data — Blueprint Architect Theme
// Colors: Creational=#3fb950 (green), Structural=#d29922 (amber), Behavioral=#f85149 (red)

export type Language = "java" | "csharp" | "python" | "ruby";
export type Category = "creational" | "structural" | "behavioral";

export interface PatternTranslation {
  name: string;
  intent: string;
  problem: string;
  solution: string;
  applicability: string[];
  consequences: string[];
}

export interface CodeExample {
  java: string;
  csharp: string;
  python: string;
  ruby: string;
}

export interface Pattern {
  id: string;
  category: Category;
  icon: string;
  translations: {
    pt: PatternTranslation;
    en: PatternTranslation;
  };
  code: CodeExample;
  umlDescription: string;
}

export const patterns: Pattern[] = [
  // ==================== CREATIONAL ====================
  {
    id: "singleton",
    category: "creational",
    icon: "⬡",
    umlDescription: "Single class with private constructor and static instance",
    translations: {
      pt: {
        name: "Singleton",
        intent: "Garante que uma classe tenha apenas uma instância e fornece um ponto de acesso global a ela.",
        problem: "Você precisa garantir que uma classe tenha somente uma instância, ao mesmo tempo em que fornece um ponto de acesso global para essa instância.",
        solution: "Torne o construtor padrão privado para impedir que outros objetos usem o operador new com a classe Singleton. Crie um método de criação estático que atue como um construtor.",
        applicability: [
          "Use quando uma classe deve ter somente uma instância disponível para todos os clientes",
          "Use quando você precisa de um controle mais estrito sobre variáveis globais",
        ],
        consequences: [
          "Você pode ter certeza que uma classe tem apenas uma única instância",
          "Você ganha um ponto de acesso global para aquela instância",
          "O objeto singleton é inicializado somente quando for pedido pela primeira vez",
        ],
      },
      en: {
        name: "Singleton",
        intent: "Ensures a class has only one instance and provides a global access point to it.",
        problem: "You need to ensure that a class has just a single instance, while also providing a global access point to that instance.",
        solution: "Make the default constructor private to prevent other objects from using the new operator with the Singleton class. Create a static creation method that acts as a constructor.",
        applicability: [
          "Use when a class must have a single instance available to all clients",
          "Use when you need stricter control over global variables",
        ],
        consequences: [
          "You can be sure that a class has only a single instance",
          "You gain a global access point to that instance",
          "The singleton object is initialized only when it's requested for the first time",
        ],
      },
    },
    code: {
      java: `public class Singleton {
    private static Singleton instance;
    private String data;

    // Private constructor prevents instantiation
    private Singleton() {
        data = "Singleton Instance";
    }

    // Thread-safe lazy initialization
    public static synchronized Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }

    public String getData() {
        return data;
    }
}

// Usage
class Main {
    public static void main(String[] args) {
        Singleton s1 = Singleton.getInstance();
        Singleton s2 = Singleton.getInstance();
        System.out.println(s1 == s2); // true
        System.out.println(s1.getData());
    }
}`,
      csharp: `public sealed class Singleton {
    private static Singleton? _instance;
    private static readonly object _lock = new object();
    private string Data { get; set; }

    private Singleton() {
        Data = "Singleton Instance";
    }

    public static Singleton Instance {
        get {
            lock (_lock) {
                if (_instance == null) {
                    _instance = new Singleton();
                }
                return _instance;
            }
        }
    }

    public string GetData() => Data;
}

// Usage
class Program {
    static void Main() {
        var s1 = Singleton.Instance;
        var s2 = Singleton.Instance;
        Console.WriteLine(s1 == s2); // True
        Console.WriteLine(s1.GetData());
    }
}`,
      python: `class Singleton:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.data = "Singleton Instance"
        return cls._instance

    def get_data(self):
        return self.data


# Usage
if __name__ == "__main__":
    s1 = Singleton()
    s2 = Singleton()
    print(s1 is s2)       # True
    print(s1.get_data())  # Singleton Instance`,
      ruby: `class Singleton
  @instance = nil

  def self.instance
    @instance ||= new
  end

  def initialize
    @data = "Singleton Instance"
  end

  def get_data
    @data
  end

  private_class_method :new
end

# Usage
s1 = Singleton.instance
s2 = Singleton.instance
puts s1.equal?(s2)   # true
puts s1.get_data     # Singleton Instance`,
    },
  },
  {
    id: "factory-method",
    category: "creational",
    icon: "⬢",
    umlDescription: "Creator with factory method, ConcreteCreator overrides it",
    translations: {
      pt: {
        name: "Factory Method",
        intent: "Define uma interface para criar um objeto, mas deixa as subclasses decidirem quais classes instanciar.",
        problem: "Você tem um framework que precisa criar objetos de tipos variados, mas não sabe de antemão quais tipos de objetos precisará criar.",
        solution: "O padrão Factory Method sugere que você substitua chamadas diretas de construção de objetos por chamadas para um método fábrica especial.",
        applicability: [
          "Use quando não souber de antemão os tipos e dependências exatas dos objetos com os quais seu código deve funcionar",
          "Use quando quiser fornecer aos usuários do seu framework uma maneira de estender seus componentes internos",
        ],
        consequences: [
          "Você evita acoplamentos firmes entre o criador e os produtos concretos",
          "Princípio de responsabilidade única: você pode mover o código de criação do produto para um único local",
          "Princípio aberto/fechado: você pode introduzir novos tipos de produtos sem quebrar o código cliente existente",
        ],
      },
      en: {
        name: "Factory Method",
        intent: "Defines an interface for creating an object, but lets subclasses decide which classes to instantiate.",
        problem: "You have a framework that needs to create objects of varying types, but you don't know in advance what types of objects it will need to create.",
        solution: "The Factory Method pattern suggests replacing direct object construction calls with calls to a special factory method.",
        applicability: [
          "Use when you don't know beforehand the exact types and dependencies of the objects your code should work with",
          "Use when you want to provide users of your library or framework with a way to extend its internal components",
        ],
        consequences: [
          "You avoid tight coupling between the creator and the concrete products",
          "Single Responsibility Principle: you can move the product creation code into one place",
          "Open/Closed Principle: you can introduce new types of products without breaking existing client code",
        ],
      },
    },
    code: {
      java: `// Product interface
interface Notification {
    void send(String message);
}

// Concrete Products
class EmailNotification implements Notification {
    public void send(String message) {
        System.out.println("Email: " + message);
    }
}

class SMSNotification implements Notification {
    public void send(String message) {
        System.out.println("SMS: " + message);
    }
}

// Creator (abstract)
abstract class NotificationFactory {
    public abstract Notification createNotification();

    public void notify(String message) {
        Notification n = createNotification();
        n.send(message);
    }
}

// Concrete Creators
class EmailFactory extends NotificationFactory {
    public Notification createNotification() {
        return new EmailNotification();
    }
}

class SMSFactory extends NotificationFactory {
    public Notification createNotification() {
        return new SMSNotification();
    }
}

// Usage
class Main {
    public static void main(String[] args) {
        NotificationFactory factory = new EmailFactory();
        factory.notify("Hello, World!");
    }
}`,
      csharp: `// Product interface
interface INotification {
    void Send(string message);
}

// Concrete Products
class EmailNotification : INotification {
    public void Send(string message) =>
        Console.WriteLine($"Email: {message}");
}

class SmsNotification : INotification {
    public void Send(string message) =>
        Console.WriteLine($"SMS: {message}");
}

// Creator (abstract)
abstract class NotificationFactory {
    public abstract INotification CreateNotification();

    public void Notify(string message) {
        var notification = CreateNotification();
        notification.Send(message);
    }
}

// Concrete Creators
class EmailFactory : NotificationFactory {
    public override INotification CreateNotification() =>
        new EmailNotification();
}

class SmsFactory : NotificationFactory {
    public override INotification CreateNotification() =>
        new SmsNotification();
}

// Usage
var factory = new EmailFactory();
factory.Notify("Hello, World!");`,
      python: `from abc import ABC, abstractmethod

# Product interface
class Notification(ABC):
    @abstractmethod
    def send(self, message: str) -> None:
        pass

# Concrete Products
class EmailNotification(Notification):
    def send(self, message: str) -> None:
        print(f"Email: {message}")

class SMSNotification(Notification):
    def send(self, message: str) -> None:
        print(f"SMS: {message}")

# Creator (abstract)
class NotificationFactory(ABC):
    @abstractmethod
    def create_notification(self) -> Notification:
        pass

    def notify(self, message: str) -> None:
        notification = self.create_notification()
        notification.send(message)

# Concrete Creators
class EmailFactory(NotificationFactory):
    def create_notification(self) -> Notification:
        return EmailNotification()

class SMSFactory(NotificationFactory):
    def create_notification(self) -> Notification:
        return SMSNotification()

# Usage
factory = EmailFactory()
factory.notify("Hello, World!")`,
      ruby: `# Product interface (module)
module Notification
  def send_message(message)
    raise NotImplementedError
  end
end

# Concrete Products
class EmailNotification
  include Notification
  def send_message(message)
    puts "Email: #{message}"
  end
end

class SMSNotification
  include Notification
  def send_message(message)
    puts "SMS: #{message}"
  end
end

# Creator (abstract)
class NotificationFactory
  def create_notification
    raise NotImplementedError
  end

  def notify(message)
    notification = create_notification
    notification.send_message(message)
  end
end

# Concrete Creators
class EmailFactory < NotificationFactory
  def create_notification
    EmailNotification.new
  end
end

# Usage
factory = EmailFactory.new
factory.notify("Hello, World!")`,
    },
  },
  {
    id: "abstract-factory",
    category: "creational",
    icon: "⬟",
    umlDescription: "AbstractFactory with multiple product families",
    translations: {
      pt: {
        name: "Abstract Factory",
        intent: "Fornece uma interface para criar famílias de objetos relacionados ou dependentes sem especificar suas classes concretas.",
        problem: "Você precisa criar famílias de objetos relacionados sem se comprometer com suas classes concretas.",
        solution: "Declare explicitamente interfaces para cada produto distinto da família de produtos. Em seguida, faça todas as variantes dos produtos seguirem essas interfaces.",
        applicability: [
          "Use quando seu código precisa trabalhar com diversas famílias de produtos relacionados",
          "Use quando você quer fornecer uma biblioteca de produtos e quer revelar apenas suas interfaces",
        ],
        consequences: [
          "Você pode ter certeza que os produtos que você obtém de uma fábrica são compatíveis entre si",
          "Você evita um vínculo forte entre produtos concretos e o código cliente",
          "Princípio de responsabilidade única e Princípio aberto/fechado",
        ],
      },
      en: {
        name: "Abstract Factory",
        intent: "Provides an interface for creating families of related or dependent objects without specifying their concrete classes.",
        problem: "You need to create families of related objects without committing to their concrete classes.",
        solution: "Explicitly declare interfaces for each distinct product of the product family. Then make all variants of products follow those interfaces.",
        applicability: [
          "Use when your code needs to work with various families of related products",
          "Use when you want to provide a library of products and only reveal their interfaces",
        ],
        consequences: [
          "You can be sure that the products you're getting from a factory are compatible with each other",
          "You avoid tight coupling between concrete products and client code",
          "Single Responsibility Principle and Open/Closed Principle",
        ],
      },
    },
    code: {
      java: `// Abstract Products
interface Button { void render(); }
interface Checkbox { void render(); }

// Concrete Products - Windows
class WinButton implements Button {
    public void render() { System.out.println("Windows Button"); }
}
class WinCheckbox implements Checkbox {
    public void render() { System.out.println("Windows Checkbox"); }
}

// Concrete Products - Mac
class MacButton implements Button {
    public void render() { System.out.println("Mac Button"); }
}
class MacCheckbox implements Checkbox {
    public void render() { System.out.println("Mac Checkbox"); }
}

// Abstract Factory
interface GUIFactory {
    Button createButton();
    Checkbox createCheckbox();
}

// Concrete Factories
class WinFactory implements GUIFactory {
    public Button createButton() { return new WinButton(); }
    public Checkbox createCheckbox() { return new WinCheckbox(); }
}

class MacFactory implements GUIFactory {
    public Button createButton() { return new MacButton(); }
    public Checkbox createCheckbox() { return new MacCheckbox(); }
}

// Client
class Application {
    private Button btn;
    private Checkbox cb;

    Application(GUIFactory factory) {
        btn = factory.createButton();
        cb = factory.createCheckbox();
    }

    void render() { btn.render(); cb.render(); }
}`,
      csharp: `// Abstract Products
interface IButton { void Render(); }
interface ICheckbox { void Render(); }

// Concrete Products - Windows
class WinButton : IButton {
    public void Render() => Console.WriteLine("Windows Button");
}
class WinCheckbox : ICheckbox {
    public void Render() => Console.WriteLine("Windows Checkbox");
}

// Abstract Factory
interface IGUIFactory {
    IButton CreateButton();
    ICheckbox CreateCheckbox();
}

// Concrete Factory
class WinFactory : IGUIFactory {
    public IButton CreateButton() => new WinButton();
    public ICheckbox CreateCheckbox() => new WinCheckbox();
}

// Client
class Application {
    private readonly IButton _btn;
    private readonly ICheckbox _cb;

    public Application(IGUIFactory factory) {
        _btn = factory.CreateButton();
        _cb = factory.CreateCheckbox();
    }

    public void Render() { _btn.Render(); _cb.Render(); }
}`,
      python: `from abc import ABC, abstractmethod

class Button(ABC):
    @abstractmethod
    def render(self): pass

class Checkbox(ABC):
    @abstractmethod
    def render(self): pass

class WinButton(Button):
    def render(self): print("Windows Button")

class WinCheckbox(Checkbox):
    def render(self): print("Windows Checkbox")

class GUIFactory(ABC):
    @abstractmethod
    def create_button(self) -> Button: pass
    @abstractmethod
    def create_checkbox(self) -> Checkbox: pass

class WinFactory(GUIFactory):
    def create_button(self): return WinButton()
    def create_checkbox(self): return WinCheckbox()

class Application:
    def __init__(self, factory: GUIFactory):
        self.btn = factory.create_button()
        self.cb = factory.create_checkbox()

    def render(self):
        self.btn.render()
        self.cb.render()`,
      ruby: `module Button
  def render; raise NotImplementedError; end
end

class WinButton
  include Button
  def render; puts "Windows Button"; end
end

class MacButton
  include Button
  def render; puts "Mac Button"; end
end

class WinFactory
  def create_button; WinButton.new; end
  def create_checkbox; puts "Win Checkbox"; end
end

class MacFactory
  def create_button; MacButton.new; end
  def create_checkbox; puts "Mac Checkbox"; end
end

class Application
  def initialize(factory)
    @btn = factory.create_button
  end

  def render
    @btn.render
  end
end

app = Application.new(WinFactory.new)
app.render`,
    },
  },
  {
    id: "builder",
    category: "creational",
    icon: "◈",
    umlDescription: "Builder interface, ConcreteBuilder, Director, Product",
    translations: {
      pt: {
        name: "Builder",
        intent: "Separa a construção de um objeto complexo da sua representação, de modo que o mesmo processo de construção possa criar diferentes representações.",
        problem: "Você precisa construir objetos complexos passo a passo. O padrão permite produzir diferentes tipos e representações de um objeto usando o mesmo código de construção.",
        solution: "O padrão Builder sugere que você extraia o código de construção do objeto para fora de sua própria classe e mova ele para objetos separados chamados builders.",
        applicability: [
          "Use para se livrar de um 'construtor telescópico'",
          "Use quando quiser que seu código seja capaz de criar diferentes representações do mesmo produto",
          "Use para construir árvores Composite ou outros objetos complexos",
        ],
        consequences: [
          "Você pode construir objetos passo a passo, adiar etapas de construção ou rodar etapas recursivamente",
          "Você pode reutilizar o mesmo código de construção ao construir várias representações de produtos",
          "Princípio de responsabilidade única",
        ],
      },
      en: {
        name: "Builder",
        intent: "Separates the construction of a complex object from its representation, so the same construction process can create different representations.",
        problem: "You need to build complex objects step by step. The pattern allows producing different types and representations of an object using the same construction code.",
        solution: "The Builder pattern suggests extracting the object construction code out of its own class and moving it to separate objects called builders.",
        applicability: [
          "Use to get rid of a 'telescoping constructor'",
          "Use when you want your code to be able to create different representations of the same product",
          "Use to construct Composite trees or other complex objects",
        ],
        consequences: [
          "You can construct objects step-by-step, defer construction steps or run steps recursively",
          "You can reuse the same construction code when building various representations of products",
          "Single Responsibility Principle",
        ],
      },
    },
    code: {
      java: `// Product
class Pizza {
    private String size;
    private String crust;
    private String sauce;
    private String topping;

    // Getters omitted for brevity
    public String toString() {
        return size + " pizza, " + crust + " crust, " + sauce + " sauce, " + topping;
    }
}

// Builder
class PizzaBuilder {
    private Pizza pizza = new Pizza();

    public PizzaBuilder size(String size) {
        pizza.size = size; return this;
    }
    public PizzaBuilder crust(String crust) {
        pizza.crust = crust; return this;
    }
    public PizzaBuilder sauce(String sauce) {
        pizza.sauce = sauce; return this;
    }
    public PizzaBuilder topping(String topping) {
        pizza.topping = topping; return this;
    }
    public Pizza build() { return pizza; }
}

// Usage
Pizza pizza = new PizzaBuilder()
    .size("Large")
    .crust("Thin")
    .sauce("Tomato")
    .topping("Mozzarella")
    .build();`,
      csharp: `public class Pizza {
    public string Size { get; set; } = "";
    public string Crust { get; set; } = "";
    public string Sauce { get; set; } = "";
    public string Topping { get; set; } = "";

    public override string ToString() =>
        $"{Size} pizza, {Crust} crust, {Sauce} sauce, {Topping}";
}

public class PizzaBuilder {
    private readonly Pizza _pizza = new();

    public PizzaBuilder WithSize(string size) {
        _pizza.Size = size; return this;
    }
    public PizzaBuilder WithCrust(string crust) {
        _pizza.Crust = crust; return this;
    }
    public PizzaBuilder WithSauce(string sauce) {
        _pizza.Sauce = sauce; return this;
    }
    public PizzaBuilder WithTopping(string topping) {
        _pizza.Topping = topping; return this;
    }
    public Pizza Build() => _pizza;
}

// Usage
var pizza = new PizzaBuilder()
    .WithSize("Large")
    .WithCrust("Thin")
    .WithSauce("Tomato")
    .WithTopping("Mozzarella")
    .Build();`,
      python: `class Pizza:
    def __init__(self):
        self.size = ""
        self.crust = ""
        self.sauce = ""
        self.topping = ""

    def __str__(self):
        return f"{self.size} pizza, {self.crust} crust"

class PizzaBuilder:
    def __init__(self):
        self._pizza = Pizza()

    def size(self, size: str) -> "PizzaBuilder":
        self._pizza.size = size
        return self

    def crust(self, crust: str) -> "PizzaBuilder":
        self._pizza.crust = crust
        return self

    def sauce(self, sauce: str) -> "PizzaBuilder":
        self._pizza.sauce = sauce
        return self

    def topping(self, topping: str) -> "PizzaBuilder":
        self._pizza.topping = topping
        return self

    def build(self) -> Pizza:
        return self._pizza

# Usage
pizza = (PizzaBuilder()
    .size("Large")
    .crust("Thin")
    .sauce("Tomato")
    .topping("Mozzarella")
    .build())`,
      ruby: `class Pizza
  attr_accessor :size, :crust, :sauce, :topping

  def to_s
    "#{size} pizza, #{crust} crust, #{sauce} sauce"
  end
end

class PizzaBuilder
  def initialize
    @pizza = Pizza.new
  end

  def size(size)
    @pizza.size = size
    self
  end

  def crust(crust)
    @pizza.crust = crust
    self
  end

  def sauce(sauce)
    @pizza.sauce = sauce
    self
  end

  def topping(topping)
    @pizza.topping = topping
    self
  end

  def build
    @pizza
  end
end

# Usage
pizza = PizzaBuilder.new
  .size("Large")
  .crust("Thin")
  .sauce("Tomato")
  .topping("Mozzarella")
  .build`,
    },
  },
  // ==================== STRUCTURAL ====================
  {
    id: "adapter",
    category: "structural",
    icon: "⬡",
    umlDescription: "Target interface, Adapter wraps Adaptee",
    translations: {
      pt: {
        name: "Adapter",
        intent: "Converte a interface de uma classe em outra interface que os clientes esperam. O Adapter permite que classes com interfaces incompatíveis trabalhem juntas.",
        problem: "Você tem uma classe com uma interface incompatível com o código existente, mas não pode modificar a classe original.",
        solution: "Crie um adaptador que converte a interface de uma classe em outra que o cliente espera. O adaptador implementa a interface do cliente e encapsula o objeto adaptado.",
        applicability: [
          "Use quando você quer usar uma classe existente, mas sua interface não é compatível com o restante do código",
          "Use quando você quer reutilizar diversas subclasses existentes que não possuem alguma funcionalidade comum",
        ],
        consequences: [
          "Princípio de responsabilidade única: você pode separar a interface ou o código de conversão de dados da lógica primária do negócio do programa",
          "Princípio aberto/fechado: você pode introduzir novos tipos de adaptadores sem quebrar o código cliente existente",
        ],
      },
      en: {
        name: "Adapter",
        intent: "Converts the interface of a class into another interface clients expect. Adapter lets classes work together that couldn't otherwise because of incompatible interfaces.",
        problem: "You have a class with an interface incompatible with the existing code, but you can't modify the original class.",
        solution: "Create an adapter that converts the interface of a class into another that the client expects. The adapter implements the client's interface and wraps the adapted object.",
        applicability: [
          "Use when you want to use some existing class, but its interface isn't compatible with the rest of your code",
          "Use when you want to reuse several existing subclasses that lack some common functionality",
        ],
        consequences: [
          "Single Responsibility Principle: you can separate the interface or data conversion code from the primary business logic",
          "Open/Closed Principle: you can introduce new types of adapters without breaking existing client code",
        ],
      },
    },
    code: {
      java: `// Target interface (what client expects)
interface MediaPlayer {
    void play(String filename);
}

// Adaptee (incompatible interface)
class AdvancedMediaPlayer {
    public void playVlc(String filename) {
        System.out.println("Playing VLC: " + filename);
    }
    public void playMp4(String filename) {
        System.out.println("Playing MP4: " + filename);
    }
}

// Adapter
class MediaAdapter implements MediaPlayer {
    private AdvancedMediaPlayer advancedPlayer;

    public MediaAdapter() {
        advancedPlayer = new AdvancedMediaPlayer();
    }

    @Override
    public void play(String filename) {
        if (filename.endsWith(".vlc")) {
            advancedPlayer.playVlc(filename);
        } else if (filename.endsWith(".mp4")) {
            advancedPlayer.playMp4(filename);
        }
    }
}

// Usage
MediaPlayer player = new MediaAdapter();
player.play("movie.vlc");
player.play("video.mp4");`,
      csharp: `// Target interface
interface IMediaPlayer {
    void Play(string filename);
}

// Adaptee
class AdvancedMediaPlayer {
    public void PlayVlc(string filename) =>
        Console.WriteLine($"Playing VLC: {filename}");
    public void PlayMp4(string filename) =>
        Console.WriteLine($"Playing MP4: {filename}");
}

// Adapter
class MediaAdapter : IMediaPlayer {
    private readonly AdvancedMediaPlayer _player = new();

    public void Play(string filename) {
        if (filename.EndsWith(".vlc"))
            _player.PlayVlc(filename);
        else if (filename.EndsWith(".mp4"))
            _player.PlayMp4(filename);
    }
}

// Usage
IMediaPlayer player = new MediaAdapter();
player.Play("movie.vlc");
player.Play("video.mp4");`,
      python: `# Target interface
class MediaPlayer:
    def play(self, filename: str) -> None:
        raise NotImplementedError

# Adaptee (incompatible)
class AdvancedMediaPlayer:
    def play_vlc(self, filename: str) -> None:
        print(f"Playing VLC: {filename}")

    def play_mp4(self, filename: str) -> None:
        print(f"Playing MP4: {filename}")

# Adapter
class MediaAdapter(MediaPlayer):
    def __init__(self):
        self._player = AdvancedMediaPlayer()

    def play(self, filename: str) -> None:
        if filename.endswith(".vlc"):
            self._player.play_vlc(filename)
        elif filename.endswith(".mp4"):
            self._player.play_mp4(filename)

# Usage
player = MediaAdapter()
player.play("movie.vlc")
player.play("video.mp4")`,
      ruby: `# Adaptee
class AdvancedMediaPlayer
  def play_vlc(filename)
    puts "Playing VLC: #{filename}"
  end

  def play_mp4(filename)
    puts "Playing MP4: #{filename}"
  end
end

# Adapter
class MediaAdapter
  def initialize
    @player = AdvancedMediaPlayer.new
  end

  def play(filename)
    if filename.end_with?(".vlc")
      @player.play_vlc(filename)
    elsif filename.end_with?(".mp4")
      @player.play_mp4(filename)
    end
  end
end

# Usage
adapter = MediaAdapter.new
adapter.play("movie.vlc")
adapter.play("video.mp4")`,
    },
  },
  {
    id: "decorator",
    category: "structural",
    icon: "◉",
    umlDescription: "Component interface, ConcreteComponent, Decorator wraps Component",
    translations: {
      pt: {
        name: "Decorator",
        intent: "Anexa responsabilidades adicionais a um objeto dinamicamente. Os decoradores fornecem uma alternativa flexível à herança para estender a funcionalidade.",
        problem: "Você quer adicionar comportamentos a objetos individuais sem afetar outros objetos da mesma classe.",
        solution: "Envolva o objeto alvo em um objeto decorador que contém os comportamentos extras. O decorador implementa a mesma interface que o componente original.",
        applicability: [
          "Use quando quiser atribuir responsabilidades extras a objetos em tempo de execução sem quebrar o código que usa esses objetos",
          "Use quando for impraticável ou impossível estender o comportamento de um objeto usando herança",
        ],
        consequences: [
          "Você pode estender o comportamento de um objeto sem criar uma nova subclasse",
          "Você pode adicionar ou remover responsabilidades de um objeto em tempo de execução",
          "Você pode combinar diversos comportamentos ao envolver o objeto com múltiplos decoradores",
        ],
      },
      en: {
        name: "Decorator",
        intent: "Attaches additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality.",
        problem: "You want to add behaviors to individual objects without affecting other objects of the same class.",
        solution: "Wrap the target object in a decorator object that contains the extra behaviors. The decorator implements the same interface as the original component.",
        applicability: [
          "Use when you want to add extra responsibilities to objects at runtime without breaking the code that uses these objects",
          "Use when it's awkward or not possible to extend an object's behavior using inheritance",
        ],
        consequences: [
          "You can extend an object's behavior without making a new subclass",
          "You can add or remove responsibilities from an object at runtime",
          "You can combine several behaviors by wrapping an object into multiple decorators",
        ],
      },
    },
    code: {
      java: `// Component interface
interface Coffee {
    String getDescription();
    double getCost();
}

// Concrete Component
class SimpleCoffee implements Coffee {
    public String getDescription() { return "Simple Coffee"; }
    public double getCost() { return 1.0; }
}

// Base Decorator
abstract class CoffeeDecorator implements Coffee {
    protected Coffee coffee;
    CoffeeDecorator(Coffee coffee) { this.coffee = coffee; }
}

// Concrete Decorators
class MilkDecorator extends CoffeeDecorator {
    MilkDecorator(Coffee coffee) { super(coffee); }
    public String getDescription() { return coffee.getDescription() + ", Milk"; }
    public double getCost() { return coffee.getCost() + 0.25; }
}

class SugarDecorator extends CoffeeDecorator {
    SugarDecorator(Coffee coffee) { super(coffee); }
    public String getDescription() { return coffee.getDescription() + ", Sugar"; }
    public double getCost() { return coffee.getCost() + 0.10; }
}

// Usage
Coffee coffee = new SimpleCoffee();
coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);
System.out.println(coffee.getDescription()); // Simple Coffee, Milk, Sugar
System.out.println(coffee.getCost());        // 1.35`,
      csharp: `interface ICoffee {
    string GetDescription();
    double GetCost();
}

class SimpleCoffee : ICoffee {
    public string GetDescription() => "Simple Coffee";
    public double GetCost() => 1.0;
}

abstract class CoffeeDecorator : ICoffee {
    protected ICoffee _coffee;
    protected CoffeeDecorator(ICoffee coffee) => _coffee = coffee;
    public abstract string GetDescription();
    public abstract double GetCost();
}

class MilkDecorator : CoffeeDecorator {
    public MilkDecorator(ICoffee coffee) : base(coffee) { }
    public override string GetDescription() =>
        _coffee.GetDescription() + ", Milk";
    public override double GetCost() => _coffee.GetCost() + 0.25;
}

// Usage
ICoffee coffee = new SimpleCoffee();
coffee = new MilkDecorator(coffee);
Console.WriteLine(coffee.GetDescription()); // Simple Coffee, Milk
Console.WriteLine(coffee.GetCost());        // 1.25`,
      python: `from abc import ABC, abstractmethod

class Coffee(ABC):
    @abstractmethod
    def get_description(self) -> str: pass
    @abstractmethod
    def get_cost(self) -> float: pass

class SimpleCoffee(Coffee):
    def get_description(self) -> str: return "Simple Coffee"
    def get_cost(self) -> float: return 1.0

class CoffeeDecorator(Coffee):
    def __init__(self, coffee: Coffee):
        self._coffee = coffee

class MilkDecorator(CoffeeDecorator):
    def get_description(self) -> str:
        return self._coffee.get_description() + ", Milk"
    def get_cost(self) -> float:
        return self._coffee.get_cost() + 0.25

class SugarDecorator(CoffeeDecorator):
    def get_description(self) -> str:
        return self._coffee.get_description() + ", Sugar"
    def get_cost(self) -> float:
        return self._coffee.get_cost() + 0.10

# Usage
coffee = SimpleCoffee()
coffee = MilkDecorator(coffee)
coffee = SugarDecorator(coffee)
print(coffee.get_description())  # Simple Coffee, Milk, Sugar
print(coffee.get_cost())         # 1.35`,
      ruby: `module Coffee
  def description; raise NotImplementedError; end
  def cost; raise NotImplementedError; end
end

class SimpleCoffee
  include Coffee
  def description; "Simple Coffee"; end
  def cost; 1.0; end
end

class CoffeeDecorator
  include Coffee
  def initialize(coffee)
    @coffee = coffee
  end
end

class MilkDecorator < CoffeeDecorator
  def description; "#{@coffee.description}, Milk"; end
  def cost; @coffee.cost + 0.25; end
end

class SugarDecorator < CoffeeDecorator
  def description; "#{@coffee.description}, Sugar"; end
  def cost; @coffee.cost + 0.10; end
end

# Usage
coffee = SimpleCoffee.new
coffee = MilkDecorator.new(coffee)
coffee = SugarDecorator.new(coffee)
puts coffee.description  # Simple Coffee, Milk, Sugar
puts coffee.cost         # 1.35`,
    },
  },
  {
    id: "facade",
    category: "structural",
    icon: "▣",
    umlDescription: "Facade provides simplified interface to complex subsystem",
    translations: {
      pt: {
        name: "Facade",
        intent: "Fornece uma interface simplificada para uma biblioteca, um framework ou qualquer conjunto complexo de classes.",
        problem: "Você precisa ter uma interface limitada mas simples para um subsistema complexo.",
        solution: "Uma fachada é uma classe que fornece uma interface simples para um subsistema complexo que contém muitas partes móveis.",
        applicability: [
          "Use quando você precisa ter uma interface limitada mas simples para um subsistema complexo",
          "Use quando você quer estruturar um subsistema em camadas",
        ],
        consequences: [
          "Você pode isolar seu código da complexidade de um subsistema",
        ],
      },
      en: {
        name: "Facade",
        intent: "Provides a simplified interface to a library, a framework, or any other complex set of classes.",
        problem: "You need to have a limited but straightforward interface to a complex subsystem.",
        solution: "A facade is a class that provides a simple interface to a complex subsystem which contains lots of moving parts.",
        applicability: [
          "Use when you need to have a limited but straightforward interface to a complex subsystem",
          "Use when you want to structure a subsystem into layers",
        ],
        consequences: [
          "You can isolate your code from the complexity of a subsystem",
        ],
      },
    },
    code: {
      java: `// Complex subsystem classes
class CPU { public void freeze() {} public void jump(long pos) {} public void execute() {} }
class Memory { public void load(long pos, byte[] data) {} }
class HardDrive { public byte[] read(long lba, int size) { return new byte[size]; } }

// Facade
class ComputerFacade {
    private CPU cpu = new CPU();
    private Memory memory = new Memory();
    private HardDrive hd = new HardDrive();

    public void start() {
        cpu.freeze();
        memory.load(0, hd.read(0, 1024));
        cpu.jump(0);
        cpu.execute();
        System.out.println("Computer started!");
    }
}

// Usage - Client only knows the facade
ComputerFacade computer = new ComputerFacade();
computer.start();`,
      csharp: `class CPU {
    public void Freeze() { }
    public void Jump(long pos) { }
    public void Execute() { }
}

class Memory {
    public void Load(long pos, byte[] data) { }
}

class HardDrive {
    public byte[] Read(long lba, int size) => new byte[size];
}

// Facade
class ComputerFacade {
    private readonly CPU _cpu = new();
    private readonly Memory _memory = new();
    private readonly HardDrive _hd = new();

    public void Start() {
        _cpu.Freeze();
        _memory.Load(0, _hd.Read(0, 1024));
        _cpu.Jump(0);
        _cpu.Execute();
        Console.WriteLine("Computer started!");
    }
}

// Usage
var computer = new ComputerFacade();
computer.Start();`,
      python: `class CPU:
    def freeze(self): pass
    def jump(self, pos: int): pass
    def execute(self): pass

class Memory:
    def load(self, pos: int, data: bytes): pass

class HardDrive:
    def read(self, lba: int, size: int) -> bytes:
        return bytes(size)

# Facade
class ComputerFacade:
    def __init__(self):
        self._cpu = CPU()
        self._memory = Memory()
        self._hd = HardDrive()

    def start(self):
        self._cpu.freeze()
        self._memory.load(0, self._hd.read(0, 1024))
        self._cpu.jump(0)
        self._cpu.execute()
        print("Computer started!")

# Usage
computer = ComputerFacade()
computer.start()`,
      ruby: `class CPU
  def freeze; end
  def jump(pos); end
  def execute; end
end

class Memory
  def load(pos, data); end
end

class HardDrive
  def read(lba, size); "0" * size; end
end

# Facade
class ComputerFacade
  def initialize
    @cpu = CPU.new
    @memory = Memory.new
    @hd = HardDrive.new
  end

  def start
    @cpu.freeze
    @memory.load(0, @hd.read(0, 1024))
    @cpu.jump(0)
    @cpu.execute
    puts "Computer started!"
  end
end

# Usage
computer = ComputerFacade.new
computer.start`,
    },
  },
  // ==================== BEHAVIORAL ====================
  {
    id: "observer",
    category: "behavioral",
    icon: "◎",
    umlDescription: "Subject maintains list of Observers, notifies on state change",
    translations: {
      pt: {
        name: "Observer",
        intent: "Define uma dependência um-para-muitos entre objetos para que quando um objeto mude de estado, todos os seus dependentes sejam notificados e atualizados automaticamente.",
        problem: "Você tem objetos que precisam ser notificados quando o estado de outro objeto muda, mas não quer criar acoplamento forte entre eles.",
        solution: "O objeto que possui algum estado interessante é chamado de publicador. Todos os outros objetos que querem rastrear mudanças no estado do publicador são chamados de assinantes.",
        applicability: [
          "Use quando mudanças no estado de um objeto podem precisar mudar outros objetos",
          "Use quando alguns objetos em sua aplicação devem observar outros, mas apenas por um tempo limitado ou em casos específicos",
        ],
        consequences: [
          "Princípio aberto/fechado: você pode introduzir novas classes assinantes sem ter que mudar o código do publicador",
          "Você pode estabelecer relações entre objetos em tempo de execução",
        ],
      },
      en: {
        name: "Observer",
        intent: "Defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.",
        problem: "You have objects that need to be notified when another object's state changes, but you don't want to create tight coupling between them.",
        solution: "The object that has some interesting state is called the publisher. All other objects that want to track changes to the publisher's state are called subscribers.",
        applicability: [
          "Use when changes to the state of one object may require changing other objects",
          "Use when some objects in your app must observe others, but only for a limited time or in specific cases",
        ],
        consequences: [
          "Open/Closed Principle: you can introduce new subscriber classes without changing the publisher's code",
          "You can establish relations between objects at runtime",
        ],
      },
    },
    code: {
      java: `import java.util.ArrayList;
import java.util.List;

// Observer interface
interface Observer {
    void update(String event, Object data);
}

// Subject (Publisher)
class EventManager {
    private List<Observer> listeners = new ArrayList<>();

    public void subscribe(Observer listener) {
        listeners.add(listener);
    }

    public void unsubscribe(Observer listener) {
        listeners.remove(listener);
    }

    public void notify(String event, Object data) {
        for (Observer listener : listeners) {
            listener.update(event, data);
        }
    }
}

// Concrete Observers
class EmailAlert implements Observer {
    public void update(String event, Object data) {
        System.out.println("Email alert: " + event + " - " + data);
    }
}

class LoggingListener implements Observer {
    public void update(String event, Object data) {
        System.out.println("Log: " + event + " - " + data);
    }
}

// Usage
EventManager manager = new EventManager();
manager.subscribe(new EmailAlert());
manager.subscribe(new LoggingListener());
manager.notify("file.open", "test.txt");`,
      csharp: `using System.Collections.Generic;

// Observer interface
interface IObserver {
    void Update(string eventType, object data);
}

// Subject
class EventManager {
    private List<IObserver> _listeners = new();

    public void Subscribe(IObserver listener) =>
        _listeners.Add(listener);

    public void Unsubscribe(IObserver listener) =>
        _listeners.Remove(listener);

    public void Notify(string eventType, object data) {
        foreach (var listener in _listeners)
            listener.Update(eventType, data);
    }
}

// Concrete Observers
class EmailAlert : IObserver {
    public void Update(string eventType, object data) =>
        Console.WriteLine($"Email: {eventType} - {data}");
}

class LoggingListener : IObserver {
    public void Update(string eventType, object data) =>
        Console.WriteLine($"Log: {eventType} - {data}");
}

// Usage
var manager = new EventManager();
manager.Subscribe(new EmailAlert());
manager.Subscribe(new LoggingListener());
manager.Notify("file.open", "test.txt");`,
      python: `from typing import Callable, Dict, List

class EventManager:
    def __init__(self):
        self._listeners: Dict[str, List[Callable]] = {}

    def subscribe(self, event_type: str, listener: Callable):
        if event_type not in self._listeners:
            self._listeners[event_type] = []
        self._listeners[event_type].append(listener)

    def unsubscribe(self, event_type: str, listener: Callable):
        self._listeners[event_type].remove(listener)

    def notify(self, event_type: str, data: object):
        for listener in self._listeners.get(event_type, []):
            listener(data)

# Concrete listeners
def email_alert(data):
    print(f"Email alert: {data}")

def log_event(data):
    print(f"Log: {data}")

# Usage
manager = EventManager()
manager.subscribe("file.open", email_alert)
manager.subscribe("file.open", log_event)
manager.notify("file.open", "test.txt")`,
      ruby: `class EventManager
  def initialize
    @listeners = Hash.new { |h, k| h[k] = [] }
  end

  def subscribe(event_type, &listener)
    @listeners[event_type] << listener
  end

  def notify(event_type, data)
    @listeners[event_type].each { |l| l.call(data) }
  end
end

# Usage
manager = EventManager.new

manager.subscribe("file.open") do |data|
  puts "Email alert: #{data}"
end

manager.subscribe("file.open") do |data|
  puts "Log: #{data}"
end

manager.notify("file.open", "test.txt")`,
    },
  },
  {
    id: "strategy",
    category: "behavioral",
    icon: "◆",
    umlDescription: "Context uses Strategy interface, ConcreteStrategies implement it",
    translations: {
      pt: {
        name: "Strategy",
        intent: "Define uma família de algoritmos, encapsula cada um deles e os torna intercambiáveis. O Strategy permite que o algoritmo varie independentemente dos clientes que o utilizam.",
        problem: "Você quer definir uma classe que terá um comportamento similar, mas com algoritmos diferentes para cada instância.",
        solution: "O padrão Strategy sugere que você pegue uma classe que faz algo específico em diversas maneiras diferentes e extraia todos esses algoritmos para classes separadas chamadas estratégias.",
        applicability: [
          "Use quando você quer usar diferentes variantes de um algoritmo dentro de um objeto e ser capaz de trocar de um algoritmo para outro durante a execução",
          "Use quando você tem muitas classes parecidas que somente diferem na forma que executam algum comportamento",
        ],
        consequences: [
          "Você pode trocar algoritmos usados dentro de um objeto em tempo de execução",
          "Você pode isolar os detalhes de implementação de um algoritmo do código que usa ele",
          "Princípio aberto/fechado: você pode introduzir novas estratégias sem mudar o contexto",
        ],
      },
      en: {
        name: "Strategy",
        intent: "Defines a family of algorithms, encapsulates each one, and makes them interchangeable. Strategy lets the algorithm vary independently from clients that use it.",
        problem: "You want to define a class that will have similar behavior, but with different algorithms for each instance.",
        solution: "The Strategy pattern suggests taking a class that does something specific in a lot of different ways and extracting all of these algorithms into separate classes called strategies.",
        applicability: [
          "Use when you want to use different variants of an algorithm within an object and be able to switch from one algorithm to another during runtime",
          "Use when you have a lot of similar classes that only differ in the way they execute some behavior",
        ],
        consequences: [
          "You can swap algorithms used inside an object at runtime",
          "You can isolate the implementation details of an algorithm from the code that uses it",
          "Open/Closed Principle: you can introduce new strategies without changing the context",
        ],
      },
    },
    code: {
      java: `// Strategy interface
interface SortStrategy {
    void sort(int[] data);
}

// Concrete Strategies
class BubbleSort implements SortStrategy {
    public void sort(int[] data) {
        System.out.println("Sorting using Bubble Sort");
        // bubble sort implementation
    }
}

class QuickSort implements SortStrategy {
    public void sort(int[] data) {
        System.out.println("Sorting using Quick Sort");
        // quick sort implementation
    }
}

// Context
class Sorter {
    private SortStrategy strategy;

    public Sorter(SortStrategy strategy) {
        this.strategy = strategy;
    }

    public void setStrategy(SortStrategy strategy) {
        this.strategy = strategy;
    }

    public void sort(int[] data) {
        strategy.sort(data);
    }
}

// Usage
int[] data = {5, 2, 8, 1, 9};
Sorter sorter = new Sorter(new BubbleSort());
sorter.sort(data);

sorter.setStrategy(new QuickSort());
sorter.sort(data);`,
      csharp: `// Strategy interface
interface ISortStrategy {
    void Sort(int[] data);
}

// Concrete Strategies
class BubbleSort : ISortStrategy {
    public void Sort(int[] data) =>
        Console.WriteLine("Sorting with Bubble Sort");
}

class QuickSort : ISortStrategy {
    public void Sort(int[] data) =>
        Console.WriteLine("Sorting with Quick Sort");
}

// Context
class Sorter {
    private ISortStrategy _strategy;

    public Sorter(ISortStrategy strategy) =>
        _strategy = strategy;

    public void SetStrategy(ISortStrategy strategy) =>
        _strategy = strategy;

    public void Sort(int[] data) => _strategy.Sort(data);
}

// Usage
var sorter = new Sorter(new BubbleSort());
sorter.Sort(new[] { 5, 2, 8, 1, 9 });

sorter.SetStrategy(new QuickSort());
sorter.Sort(new[] { 5, 2, 8, 1, 9 });`,
      python: `from abc import ABC, abstractmethod
from typing import List

class SortStrategy(ABC):
    @abstractmethod
    def sort(self, data: List[int]) -> List[int]:
        pass

class BubbleSort(SortStrategy):
    def sort(self, data: List[int]) -> List[int]:
        print("Sorting with Bubble Sort")
        arr = data.copy()
        n = len(arr)
        for i in range(n):
            for j in range(0, n-i-1):
                if arr[j] > arr[j+1]:
                    arr[j], arr[j+1] = arr[j+1], arr[j]
        return arr

class QuickSort(SortStrategy):
    def sort(self, data: List[int]) -> List[int]:
        print("Sorting with Quick Sort")
        if len(data) <= 1:
            return data
        pivot = data[len(data) // 2]
        left = [x for x in data if x < pivot]
        right = [x for x in data if x > pivot]
        return left + [pivot] + right

class Sorter:
    def __init__(self, strategy: SortStrategy):
        self._strategy = strategy

    def set_strategy(self, strategy: SortStrategy):
        self._strategy = strategy

    def sort(self, data: List[int]) -> List[int]:
        return self._strategy.sort(data)

# Usage
sorter = Sorter(BubbleSort())
result = sorter.sort([5, 2, 8, 1, 9])`,
      ruby: `class BubbleSort
  def sort(data)
    puts "Sorting with Bubble Sort"
    arr = data.dup
    n = arr.length
    (0...n).each do |i|
      (0...n-i-1).each do |j|
        arr[j], arr[j+1] = arr[j+1], arr[j] if arr[j] > arr[j+1]
      end
    end
    arr
  end
end

class QuickSort
  def sort(data)
    puts "Sorting with Quick Sort"
    return data if data.length <= 1
    pivot = data[data.length / 2]
    left = data.select { |x| x < pivot }
    right = data.select { |x| x > pivot }
    sort(left) + [pivot] + sort(right)
  end
end

class Sorter
  def initialize(strategy)
    @strategy = strategy
  end

  def set_strategy(strategy)
    @strategy = strategy
  end

  def sort(data)
    @strategy.sort(data)
  end
end

# Usage
sorter = Sorter.new(BubbleSort.new)
result = sorter.sort([5, 2, 8, 1, 9])`,
    },
  },
  {
    id: "command",
    category: "behavioral",
    icon: "◇",
    umlDescription: "Command interface, ConcreteCommand, Invoker, Receiver",
    translations: {
      pt: {
        name: "Command",
        intent: "Encapsula uma solicitação como um objeto, permitindo parametrizar clientes com diferentes solicitações, enfileirar ou fazer o registro de solicitações e suportar operações que podem ser desfeitas.",
        problem: "Você precisa parametrizar objetos com operações, enfileirar operações, implementar operações reversíveis ou registrar operações.",
        solution: "O padrão Command sugere que os objetos GUI não enviem essas solicitações diretamente. Em vez disso, você deve extrair todos os detalhes da solicitação em uma classe de comando separada.",
        applicability: [
          "Use quando você quer parametrizar objetos com operações",
          "Use quando você quer colocar operações em fila, agendar sua execução, ou executá-las remotamente",
          "Use quando você quer implementar operações reversíveis",
        ],
        consequences: [
          "Princípio de responsabilidade única: você pode desacoplar classes que invocam operações de classes que realizam essas operações",
          "Princípio aberto/fechado: você pode introduzir novos comandos sem quebrar o código cliente existente",
          "Você pode implementar desfazer/refazer",
        ],
      },
      en: {
        name: "Command",
        intent: "Encapsulates a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations.",
        problem: "You need to parameterize objects with operations, queue operations, implement reversible operations, or log operations.",
        solution: "The Command pattern suggests that GUI objects shouldn't send these requests directly. Instead, you should extract all of the request details into a separate command class.",
        applicability: [
          "Use when you want to parametrize objects with operations",
          "Use when you want to queue operations, schedule their execution, or execute them remotely",
          "Use when you want to implement reversible operations",
        ],
        consequences: [
          "Single Responsibility Principle: you can decouple classes that invoke operations from classes that perform these operations",
          "Open/Closed Principle: you can introduce new commands without breaking existing client code",
          "You can implement undo/redo",
        ],
      },
    },
    code: {
      java: `// Command interface
interface Command {
    void execute();
    void undo();
}

// Receiver
class TextEditor {
    private StringBuilder text = new StringBuilder();

    public void write(String word) {
        text.append(word);
    }

    public void delete(int chars) {
        int len = text.length();
        if (chars <= len) text.delete(len - chars, len);
    }

    public String getText() { return text.toString(); }
}

// Concrete Command
class WriteCommand implements Command {
    private TextEditor editor;
    private String word;

    WriteCommand(TextEditor editor, String word) {
        this.editor = editor;
        this.word = word;
    }

    public void execute() { editor.write(word); }
    public void undo() { editor.delete(word.length()); }
}

// Invoker
class CommandHistory {
    private java.util.Stack<Command> history = new java.util.Stack<>();

    public void execute(Command cmd) {
        cmd.execute();
        history.push(cmd);
    }

    public void undo() {
        if (!history.isEmpty()) history.pop().undo();
    }
}`,
      csharp: `interface ICommand {
    void Execute();
    void Undo();
}

class TextEditor {
    private StringBuilder _text = new();

    public void Write(string word) => _text.Append(word);
    public void Delete(int chars) {
        if (chars <= _text.Length)
            _text.Remove(_text.Length - chars, chars);
    }
    public string GetText() => _text.ToString();
}

class WriteCommand : ICommand {
    private readonly TextEditor _editor;
    private readonly string _word;

    public WriteCommand(TextEditor editor, string word) {
        _editor = editor; _word = word;
    }

    public void Execute() => _editor.Write(_word);
    public void Undo() => _editor.Delete(_word.Length);
}

class CommandHistory {
    private Stack<ICommand> _history = new();

    public void Execute(ICommand cmd) {
        cmd.Execute();
        _history.Push(cmd);
    }

    public void Undo() {
        if (_history.Count > 0) _history.Pop().Undo();
    }
}`,
      python: `from abc import ABC, abstractmethod
from collections import deque

class Command(ABC):
    @abstractmethod
    def execute(self) -> None: pass
    @abstractmethod
    def undo(self) -> None: pass

class TextEditor:
    def __init__(self):
        self._text = []

    def write(self, word: str) -> None:
        self._text.append(word)

    def delete(self, chars: int) -> None:
        text = "".join(self._text)
        self._text = [text[:-chars]] if chars < len(text) else []

    def get_text(self) -> str:
        return "".join(self._text)

class WriteCommand(Command):
    def __init__(self, editor: TextEditor, word: str):
        self._editor = editor
        self._word = word

    def execute(self) -> None:
        self._editor.write(self._word)

    def undo(self) -> None:
        self._editor.delete(len(self._word))

class CommandHistory:
    def __init__(self):
        self._history: deque[Command] = deque()

    def execute(self, cmd: Command) -> None:
        cmd.execute()
        self._history.append(cmd)

    def undo(self) -> None:
        if self._history:
            self._history.pop().undo()`,
      ruby: `class TextEditor
  def initialize
    @text = ""
  end

  def write(word)
    @text += word
  end

  def delete(chars)
    @text = @text[0...-chars] if chars <= @text.length
  end

  def get_text
    @text
  end
end

class WriteCommand
  def initialize(editor, word)
    @editor = editor
    @word = word
  end

  def execute
    @editor.write(@word)
  end

  def undo
    @editor.delete(@word.length)
  end
end

class CommandHistory
  def initialize
    @history = []
  end

  def execute(cmd)
    cmd.execute
    @history.push(cmd)
  end

  def undo
    @history.pop&.undo
  end
end`,
    },
  },
];

export const categoryColors: Record<Category, { bg: string; text: string; border: string; badge: string }> = {
  creational: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
  },
  structural: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/30",
    badge: "bg-amber-500/20 text-amber-300 border-amber-500/40",
  },
  behavioral: {
    bg: "bg-red-500/10",
    text: "text-red-400",
    border: "border-red-500/30",
    badge: "bg-red-500/20 text-red-300 border-red-500/40",
  },
};

export const translations = {
  pt: {
    nav: {
      home: "Início",
      patterns: "Padrões",
      about: "Sobre",
      contact: "Contato",
    },
    hero: {
      badge: "Referência em Design Patterns",
      title: "Padrões de Projeto",
      subtitle: "para Desenvolvedores Modernos",
      description: "Guia completo de Design Patterns com exemplos em Java, C#, Python e Ruby. Aprenda os 22 padrões clássicos do GoF com explicações claras e código prático.",
      cta_primary: "Explorar Padrões",
      cta_secondary: "Sobre o Autor",
      stats: {
        patterns: "Padrões",
        languages: "Linguagens",
        years: "Anos de Exp.",
        categories: "Categorias",
      },
    },
    categories: {
      creational: "Criacionais",
      structural: "Estruturais",
      behavioral: "Comportamentais",
      creational_desc: "Padrões que lidam com mecanismos de criação de objetos",
      structural_desc: "Padrões que lidam com composição de classes e objetos",
      behavioral_desc: "Padrões que lidam com comunicação entre objetos",
    },
    patterns_section: {
      title: "Catálogo de Padrões",
      subtitle: "Explore os padrões de projeto clássicos do Gang of Four",
      search: "Buscar padrão...",
      all: "Todos",
      view_code: "Ver Código",
      intent: "Intenção",
      problem: "Problema",
      solution: "Solução",
      applicability: "Aplicabilidade",
      consequences: "Consequências",
    },
    about: {
      title: "Sobre o Autor",
      subtitle: "Tech Lead & Full Stack Developer",
      bio_title: "Quem sou eu",
      experience_title: "Experiência",
      skills_title: "Habilidades",
      connect: "Conectar no LinkedIn",
    },
    footer: {
      rights: "Todos os direitos reservados",
      built_with: "Construído com paixão por tecnologia",
    },
  },
  en: {
    nav: {
      home: "Home",
      patterns: "Patterns",
      about: "About",
      contact: "Contact",
    },
    hero: {
      badge: "Design Patterns Reference",
      title: "Design Patterns",
      subtitle: "for Modern Developers",
      description: "Complete guide to Design Patterns with examples in Java, C#, Python and Ruby. Learn the 22 classic GoF patterns with clear explanations and practical code.",
      cta_primary: "Explore Patterns",
      cta_secondary: "About the Author",
      stats: {
        patterns: "Patterns",
        languages: "Languages",
        years: "Years Exp.",
        categories: "Categories",
      },
    },
    categories: {
      creational: "Creational",
      structural: "Structural",
      behavioral: "Behavioral",
      creational_desc: "Patterns that deal with object creation mechanisms",
      structural_desc: "Patterns that deal with class and object composition",
      behavioral_desc: "Patterns that deal with object communication",
    },
    patterns_section: {
      title: "Pattern Catalog",
      subtitle: "Explore the classic Gang of Four design patterns",
      search: "Search pattern...",
      all: "All",
      view_code: "View Code",
      intent: "Intent",
      problem: "Problem",
      solution: "Solution",
      applicability: "Applicability",
      consequences: "Consequences",
    },
    about: {
      title: "About the Author",
      subtitle: "Tech Lead & Full Stack Developer",
      bio_title: "Who I am",
      experience_title: "Experience",
      skills_title: "Skills",
      connect: "Connect on LinkedIn",
    },
    footer: {
      rights: "All rights reserved",
      built_with: "Built with passion for technology",
    },
  },
};
